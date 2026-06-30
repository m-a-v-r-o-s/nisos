import Link from "next/link";
import { notFound } from "next/navigation";
import {
  prisma,
  formatMoney,
  formatDay,
  getGroupVehicleAvailability,
  BOOKING_STATUSES,
} from "@rentals/db";
import { StatusBadge, PaymentBadge } from "@/components/Badges";
import {
  setBookingStatus,
  assignVehicle,
  updatePayment,
  cancelBooking,
  saveNotes,
} from "../../actions";
import { getDictionary, getLocale } from "@/lib/i18n/server";
import { INTL_LOCALE } from "@/lib/i18n/config";
import { format } from "@/lib/i18n/format";

export const dynamic = "force-dynamic";

export default async function BookingDetail({
  params,
}: {
  params: { id: string };
}) {
  const locale = getLocale();
  const t = getDictionary(locale);
  const intl = INTL_LOCALE[locale];
  const b = await prisma.booking.findUnique({
    where: { id: params.id },
    include: { vehicle: true, group: true, customer: true },
  });
  if (!b) notFound();

  // same-group vehicles + availability for substitution
  const groupVehicles = await prisma.vehicle.findMany({
    where: { groupId: b.groupId },
    orderBy: { sortOrder: "asc" },
  });
  const avail = await getGroupVehicleAvailability(b.groupId, b.startDate, b.endDate);
  const availMap = new Map(avail.map((a) => [a.vehicleId, a.available]));

  const addOns = JSON.parse(b.addOns) as { label: string; price: number }[];
  const balance = b.total - b.amountPaid;

  return (
    <div className="space-y-6">
      <Link href="/bookings" className="text-sm text-slate-500 hover:text-sea">{t.booking.backAll}</Link>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">{b.reference}</h1>
          <p className="text-sm text-slate-500">
            {format(t.booking.bookedOn, {
              date: formatDay(b.createdAt, intl),
              method: b.paymentMethod === "cash" ? t.booking.cashMethod : t.booking.onlineMethod,
            })}
          </p>
        </div>
        <div className="flex gap-2">
          <StatusBadge status={b.status} />
          <PaymentBadge status={b.paymentStatus} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* LEFT */}
        <div className="space-y-6">
          {/* trip */}
          <section className="card p-5">
            <h2 className="font-display font-semibold text-ink">{t.booking.trip}</h2>
            <dl className="mt-3 grid grid-cols-2 gap-y-3 text-sm">
              <DT>{t.booking.vehicle}</DT><DD>{b.vehicle.name} <span className="text-slate-400">({b.group.name})</span></DD>
              <DT>{t.booking.pickup}</DT><DD>{formatDay(b.startDate, intl)} · {b.pickupLocation}</DD>
              <DT>{t.booking.dropoff}</DT><DD>{formatDay(b.endDate, intl)} · {b.dropoffLocation}</DD>
              <DT>{t.booking.duration}</DT><DD>{b.days} {b.days === 1 ? t.common.day : t.common.days}</DD>
            </dl>
          </section>

          {/* substitute vehicle */}
          <section className="card p-5">
            <h2 className="font-display font-semibold text-ink">{t.booking.assigned}</h2>
            <p className="mt-1 text-xs text-slate-500">
              {format(t.booking.swapHint, { group: b.group.name })}
            </p>
            <form action={assignVehicle} className="mt-3 flex flex-wrap items-end gap-3">
              <input type="hidden" name="id" value={b.id} />
              <div className="min-w-[220px] flex-1">
                <label className="label">{t.booking.vehicle}</label>
                <select name="vehicleId" defaultValue={b.vehicleId} className="field">
                  {groupVehicles.map((v) => {
                    const free = v.id === b.vehicleId || availMap.get(v.id);
                    return (
                      <option key={v.id} value={v.id} disabled={!free}>
                        {v.name}{v.id === b.vehicleId ? t.common.current : free ? "" : t.common.busy}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button className="btn-soft">{t.booking.reassign}</button>
            </form>
          </section>

          {/* charges */}
          <section className="card p-5">
            <h2 className="font-display font-semibold text-ink">{t.booking.charges}</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <Line label={format(t.booking.rentalLine, { price: formatMoney(b.pricePerDay), days: b.days })} value={formatMoney(b.pricePerDay * b.days)} />
              {addOns.map((a, i) => <Line key={i} label={a.label} value={formatMoney(a.price)} muted />)}
              <div className="my-2 border-t border-slate-200" />
              <Line label={t.booking.total} value={formatMoney(b.total)} bold />
              <Line label={t.booking.paid} value={formatMoney(b.amountPaid)} />
              <Line label={t.booking.balance} value={formatMoney(balance)} accent={balance > 0} />
            </dl>
          </section>

          {/* notes */}
          <section className="card p-5">
            <h2 className="font-display font-semibold text-ink">{t.booking.notes}</h2>
            <form action={saveNotes} className="mt-3 space-y-2">
              <input type="hidden" name="id" value={b.id} />
              <textarea name="notes" rows={3} defaultValue={b.notes ?? ""} className="field" placeholder={t.booking.notesPlaceholder} />
              <button className="btn-soft">{t.booking.saveNotes}</button>
            </form>
          </section>
        </div>

        {/* RIGHT: actions */}
        <div className="space-y-6">
          <section className="card p-5">
            <h2 className="font-display font-semibold text-ink">{t.booking.customer}</h2>
            <div className="mt-3 text-sm">
              <div className="font-medium text-ink">{b.customer.firstName} {b.customer.lastName}</div>
              <a href={`mailto:${b.customer.email}`} className="block text-sea hover:underline">{b.customer.email}</a>
              {b.customer.phone && <a href={`tel:${b.customer.phone}`} className="block text-slate-600">{b.customer.phone}</a>}
              {b.customer.country && <div className="text-slate-500">{b.customer.country}</div>}
            </div>
          </section>

          <section className="card p-5">
            <h2 className="font-display font-semibold text-ink">{t.booking.status}</h2>
            <form action={setBookingStatus} className="mt-3 flex items-end gap-2">
              <input type="hidden" name="id" value={b.id} />
              <select name="status" defaultValue={b.status} className="field">
                {BOOKING_STATUSES.map((s) => <option key={s} value={s}>{t.status[s]}</option>)}
              </select>
              <button className="btn-primary">{t.booking.update}</button>
            </form>
          </section>

          <section className="card p-5">
            <h2 className="font-display font-semibold text-ink">{t.booking.payment}</h2>
            <div className="mt-3 grid grid-cols-1 gap-2">
              <PayBtn id={b.id} action="mark_deposit" label={t.booking.markDeposit} />
              <PayBtn id={b.id} action="mark_paid" label={t.booking.markPaid} />
              <PayBtn id={b.id} action="refund" label={t.booking.markRefunded} danger />
            </div>
          </section>

          <section className="card p-5">
            <h2 className="font-display font-semibold text-ink">{t.booking.dangerZone}</h2>
            <form action={cancelBooking} className="mt-3">
              <input type="hidden" name="id" value={b.id} />
              <button className="btn-danger w-full">{t.booking.cancelBooking}</button>
            </form>
            <p className="mt-2 text-xs text-slate-400">{t.booking.cancelHint}</p>
          </section>
        </div>
      </div>
    </div>
  );
}

function PayBtn({ id, action, label, danger }: { id: string; action: string; label: string; danger?: boolean }) {
  return (
    <form action={updatePayment}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="action" value={action} />
      <button className={`${danger ? "btn-danger" : "btn-soft"} w-full`}>{label}</button>
    </form>
  );
}

function DT({ children }: { children: React.ReactNode }) {
  return <dt className="text-slate-500">{children}</dt>;
}
function DD({ children }: { children: React.ReactNode }) {
  return <dd className="text-right font-medium text-ink">{children}</dd>;
}
function Line({ label, value, bold, accent, muted }: { label: string; value: string; bold?: boolean; accent?: boolean; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={muted ? "text-slate-400" : "text-slate-600"}>{label}</span>
      <span className={`${bold ? "font-display font-bold text-ink" : ""} ${accent ? "font-semibold text-coral" : ""}`}>{value}</span>
    </div>
  );
}
