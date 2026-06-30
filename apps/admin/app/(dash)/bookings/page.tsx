import Link from "next/link";
import {
  prisma,
  formatMoney,
  formatDay,
  BOOKING_STATUSES,
} from "@rentals/db";
import { StatusBadge, PaymentBadge } from "@/components/Badges";
import { getDictionary, getLocale } from "@/lib/i18n/server";
import { INTL_LOCALE } from "@/lib/i18n/config";
import { format } from "@/lib/i18n/format";

export const dynamic = "force-dynamic";

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const locale = getLocale();
  const t = getDictionary(locale);
  const intl = INTL_LOCALE[locale];
  const status = searchParams.status;
  const valid = status && BOOKING_STATUSES.includes(status as any);

  const bookings = await prisma.booking.findMany({
    where: valid ? { status } : {},
    include: { vehicle: true, customer: true, group: true },
    orderBy: { startDate: "desc" },
    take: 100,
  });

  const filters = [{ key: "", label: t.status.all }].concat(
    BOOKING_STATUSES.map((s) => ({ key: s, label: t.status[s] })),
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">{t.bookings.title}</h1>
        <p className="text-sm text-slate-500">{format(t.bookings.shown, { count: bookings.length })}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const active = (f.key === "" && !valid) || f.key === status;
          return (
            <Link
              key={f.key || "all"}
              href={f.key ? `/bookings?status=${f.key}` : "/bookings"}
              className={`chip border ${
                active
                  ? "border-sea bg-sea text-white"
                  : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {f.label}
            </Link>
          );
        })}
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full min-w-[760px]">
          <thead className="border-b border-slate-200">
            <tr>
              <th className="th">{t.th.ref}</th><th className="th">{t.th.customer}</th>
              <th className="th">{t.th.vehicle}</th><th className="th">{t.th.group}</th>
              <th className="th">{t.th.dates}</th><th className="th">{t.th.total}</th>
              <th className="th">{t.th.status}</th><th className="th">{t.th.payment}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bookings.map((b) => (
              <tr key={b.id} className="hover:bg-slate-50">
                <td className="td font-mono text-xs">
                  <Link href={`/bookings/${b.id}`} className="text-sea hover:underline">{b.reference}</Link>
                </td>
                <td className="td">{b.customer.firstName} {b.customer.lastName}</td>
                <td className="td">{b.vehicle.name}</td>
                <td className="td text-slate-500">{b.group.name}</td>
                <td className="td whitespace-nowrap">{formatDay(b.startDate, intl)} → {formatDay(b.endDate, intl)}</td>
                <td className="td font-medium">{formatMoney(b.total)}</td>
                <td className="td"><StatusBadge status={b.status} /></td>
                <td className="td"><PaymentBadge status={b.paymentStatus} /></td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr><td colSpan={8} className="px-5 py-10 text-center text-sm text-slate-400">{t.bookings.noMatch}</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
