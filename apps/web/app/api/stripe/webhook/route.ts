import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@rentals/db";
import { getStripe } from "@/lib/stripe";

// Stripe needs the raw body to verify the signature.
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 400 });
  }

  const sig = req.headers.get("stripe-signature");
  const body = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig!, secret);
  } catch (err) {
    return NextResponse.json({ error: `Invalid signature: ${err}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as { id: string; amount_total: number | null };
    const booking = await prisma.booking.findFirst({
      where: { stripeSessionId: session.id },
    });
    if (booking) {
      await prisma.booking.update({
        where: { id: booking.id },
        data: {
          amountPaid: session.amount_total ?? booking.amountPaid,
          paymentStatus: booking.paymentOption === "full" ? "paid" : "deposit_paid",
          status: "confirmed",
        },
      });
    }
  }

  return NextResponse.json({ received: true });
}
