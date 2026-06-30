import Link from "next/link";
import { notFound } from "next/navigation";
import {
  prisma,
  formatMoney,
  formatDay,
  BRAND,
} from "@rentals/db";
import { getStripe } from "@/lib/stripe";
import { getDictionary, getLocale } from "@/lib/i18n/server";
import { INTL_LOCALE } from "@/lib/i18n/config";
import { format } from "@/lib/i18n/format";

const PAY_CHIP: Record<string, string> = {
  pending: "bg-red-100 text-red-700",
  deposit_paid: "bg-amber-100 text-amber-700",
  paid: "bg-emerald-100 text-emerald-700",
  refunded: "bg-slate-100 text-slate-700",
};

export const dynamic = "force-dynamic";

export default async function ConfirmationPage({
  params,
  searchParams,
}: {
  params: { reference: string };
  searchParams: { [k: string]: string | string[] | undefined };
}) {
  let booking = await prisma.booking.findUnique({
    where: { reference: params.reference },
    include: { vehicle: true, group: true, customer: true },
  });
  if (!booking) notFound();

  // Best-effort reconcile if returning from a real Stripe session without a webhook.
  const sessionId = Array.isArray(searchParams.session_id)
    ? searchParams.session_id[0]
    : searchParams.session_id;
  if (sessionId && booking.paymentStatus === "pending") {
    const stripe = getStripe();
    if (stripe) {
      try {
        const s = await stripe.checkout.sessions.retrieve(sessionId);
        if (s.payment_status === "paid") {
          booking = await prisma.booking.update({
            where: { id: booking.id },
            data: {
              amountPaid: s.amount_total ?? booking.amountPaid,
              paymentStatus: booking.paymentOption === "full" ? "paid" : "deposit_paid",
              status: "confirmed",
            },
            include: { vehicle: true, group: true, customer: true },
          });
        }
      } catch {
        /* ignore - show booking as-is */
      }
    }
  }

  const locale = getLocale();
  const t = getDictionary(locale);
  const intl = INTL_LOCALE[locale];
  const addOnLabels = t.addOns as Record<string, { label: string; description: string }>;

  const addOns = JSON.parse(booking.addOns) as { key?: string; label: string; price: number }[];
  const payLabel =
    t.paymentStatus[booking.paymentStatus as keyof typeof t.paymentStatus] ??
    booking.paymentStatus;
  const balance = booking.total - booking.amountPaid;

  return (
    <div className="container-x max-w-2xl py-14">
      <div className="grid h-14 w-14 place-items-center rounded-full bg-surf/15 text-surf-dark">
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h1 className="mt-5 font-display text-3xl font-bold">{t.confirmation.title}</h1>
      <p className="mt-2 text-ink/65">
        {format(t.confirmation.intro, {
          ref: booking.reference,
          email: booking.customer.email,
        })}
      </p>

      <div className="mt-8 card p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-display text-lg font-semibold">{booking.vehicle.name}</div>
            <div className="text-sm text-ink/55">{booking.group.name}</div>
          </div>
          <span className={`chip ${PAY_CHIP[booking.paymentStatus] ?? PAY_CHIP.pending}`}>{payLabel}</span>
        </div>

        <dl className="mt-5 space-y-2 text-sm">
          <Row label={t.confirmation.pickup} value={`${formatDay(booking.startDate, intl)} · ${t.locations[booking.pickupLocation as keyof typeof t.locations] ?? booking.pickupLocation}`} />
          <Row label={t.confirmation.dropoff} value={`${formatDay(booking.endDate, intl)} · ${t.locations[booking.dropoffLocation as keyof typeof t.locations] ?? booking.dropoffLocation}`} />
          <Row label={t.confirmation.duration} value={`${booking.days} ${booking.days === 1 ? t.common.day : t.common.days}`} />
          <div className="my-3 border-t border-line" />
          <Row label={format(t.confirmation.rentalLabel, { price: formatMoney(booking.pricePerDay) })} value={formatMoney(booking.pricePerDay * booking.days)} />
          {addOns.map((a, i) => (
            <Row key={i} label={(a.key && addOnLabels[a.key]?.label) || a.label} value={formatMoney(a.price)} muted />
          ))}
          <Row label={t.confirmation.total} value={formatMoney(booking.total)} bold />
          <Row label={t.confirmation.paidNow} value={formatMoney(booking.amountPaid)} />
          {balance > 0 && (
            <Row label={t.confirmation.balanceAtPickup} value={formatMoney(balance)} accent />
          )}
        </dl>

        <p className="mt-5 text-xs text-ink/50">
          {format(t.confirmation.note, {
            group: booking.group.name,
            deposit: formatMoney(booking.deposit),
          })}
        </p>
      </div>

      <div className="mt-8 flex gap-3">
        <Link href="/fleet" className="btn-ghost">{t.confirmation.browseMore}</Link>
        <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="btn-ink">{t.confirmation.callUs}</a>
      </div>
    </div>
  );
}

function Row({
  label, value, bold, accent, muted,
}: {
  label: string; value: string; bold?: boolean; accent?: boolean; muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className={muted ? "text-ink/55" : "text-ink/75"}>{label}</dt>
      <dd className={`${bold ? "font-display font-bold" : ""} ${accent ? "font-semibold text-coral" : ""}`}>{value}</dd>
    </div>
  );
}
