"use server";

import { redirect } from "next/navigation";
import {
  prisma,
  isVehicleAvailable,
  buildQuote,
  amountDueNow,
  toDay,
  ADD_ONS,
  BRAND,
  type PaymentMethod,
  type PaymentOption,
} from "@rentals/db";
import { getStripe } from "@/lib/stripe";

function makeReference() {
  return (
    "NIS-" +
    Math.random().toString(36).slice(2, 7).toUpperCase().replace(/[01OI]/g, "X")
  );
}

export async function createBooking(formData: FormData) {
  const get = (k: string) => (formData.get(k) as string | null) ?? "";

  const vehicleSlug = get("vehicleSlug");
  const fromStr = get("from");
  const toStr = get("to");
  const location = get("location") || "Main Office, Kos Town";
  const addOnKeys = formData.getAll("addOns").map(String);

  const firstName = get("firstName").trim();
  const lastName = get("lastName").trim();
  const email = get("email").trim().toLowerCase();
  const phone = get("phone").trim();
  const country = get("country").trim();

  let paymentMethod = get("paymentMethod") as PaymentMethod;
  let paymentOption = get("paymentOption") as PaymentOption;
  if (paymentMethod !== "stripe") {
    paymentMethod = "cash";
    paymentOption = "none";
  }

  const back = `/book/${vehicleSlug}?from=${fromStr}&to=${toStr}&location=${encodeURIComponent(location)}`;

  if (!firstName || !lastName || !email) {
    redirect(`${back}&error=details`);
  }

  const vehicle = await prisma.vehicle.findUnique({
    where: { slug: vehicleSlug },
    include: { group: true },
  });
  if (!vehicle || !vehicle.active) redirect(`/fleet`);

  const from = toDay(fromStr);
  const to = toDay(toStr);

  const free = await isVehicleAvailable(vehicle!.id, from, to);
  if (!free) redirect(`${back}&error=unavailable`);

  // Only keep valid add-on keys
  const validAddOns = addOnKeys.filter((k) => ADD_ONS.some((a) => a.key === k));
  const quote = buildQuote({
    pricePerDay: vehicle!.group.pricePerDay,
    start: from,
    end: to,
    addOnKeys: validAddOns,
  });

  const dueNow = amountDueNow(quote.total, paymentOption);

  // find-or-create customer
  const existing = await prisma.customer.findFirst({ where: { email } });
  const customer =
    existing ??
    (await prisma.customer.create({
      data: { firstName, lastName, email, phone, country },
    }));

  const reference = makeReference();

  const booking = await prisma.booking.create({
    data: {
      reference,
      vehicleId: vehicle!.id,
      groupId: vehicle!.groupId,
      customerId: customer.id,
      startDate: from,
      endDate: to,
      pickupLocation: location,
      dropoffLocation: location,
      days: quote.days,
      pricePerDay: quote.pricePerDay,
      addOns: JSON.stringify(quote.addOns),
      addOnsTotal: quote.addOnsTotal,
      total: quote.total,
      deposit: vehicle!.group.deposit,
      paymentMethod,
      paymentOption,
      amountPaid: 0,
      paymentStatus: "pending",
      status: paymentMethod === "cash" ? "confirmed" : "pending",
    },
  });

  // Cash on pickup - done.
  if (paymentMethod === "cash") {
    redirect(`/booking/${reference}`);
  }

  const stripe = getStripe();
  const base = process.env.NEXT_PUBLIC_WEB_URL ?? "http://localhost:3000";

  // No Stripe key configured → simulate a successful test payment.
  if (!stripe) {
    await prisma.booking.update({
      where: { id: booking.id },
      data: {
        amountPaid: dueNow,
        paymentStatus: paymentOption === "full" ? "paid" : "deposit_paid",
        status: "confirmed",
      },
    });
    redirect(`/booking/${reference}?demo=1`);
  }

  // Real Stripe Checkout (test mode).
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: email,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: BRAND.currency.toLowerCase(),
          unit_amount: dueNow,
          product_data: {
            name: `${vehicle!.name} - ${quote.days} day rental`,
            description:
              paymentOption === "deposit"
                ? `Deposit for booking ${reference}`
                : `Full payment for booking ${reference}`,
          },
        },
      },
    ],
    metadata: { bookingId: booking.id, reference },
    success_url: `${base}/booking/${reference}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${back}&error=cancelled`,
  });

  await prisma.booking.update({
    where: { id: booking.id },
    data: { stripeSessionId: session.id },
  });

  redirect(session.url!);
}
