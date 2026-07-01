import Link from "next/link";
import {
  prisma,
  formatMoney,
  formatDay,
  toDay,
  addDays,
  isoDay,
  BLOCKING_STATUSES,
} from "@rentals/db";
import { StatCard } from "@/components/StatCard";
import { StatusBadge, PaymentBadge } from "@/components/Badges";
import { getDictionary, getLocale } from "@/lib/i18n/server";
import { INTL_LOCALE } from "@/lib/i18n/config";
import { format } from "@/lib/i18n/format";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const locale = getLocale();
  const t = getDictionary(locale);
  const intl = INTL_LOCALE[locale];
  const today = toDay(new Date());
  const weekAhead = addDays(today, 7);

  const [allActive, vehicles, paidAgg, upcoming] = await Promise.all([
    prisma.booking.findMany({
      where: { status: { in: BLOCKING_STATUSES } },
      include: { vehicle: true, customer: true, group: true },
    }),
    prisma.vehicle.count({ where: { active: true } }),
    prisma.booking.aggregate({
      _sum: { amountPaid: true },
      where: { status: { not: "cancelled" } },
    }),
    prisma.booking.findMany({
      where: {
        status: { in: BLOCKING_STATUSES },
        startDate: { gte: today, lte: weekAhead },
      },
      include: { vehicle: true, customer: true, group: true },
      orderBy: { startDate: "asc" },
      take: 8,
    }),
  ]);

  const sameDay = (a: Date, b: Date) => isoDay(a) === isoDay(b);
  const pickupsToday = allActive.filter((b) => sameDay(b.startDate, today));
  const returnsToday = allActive.filter((b) => sameDay(b.endDate, today));
  const outNow = allActive.filter(
    (b) => toDay(b.startDate) <= today && toDay(b.endDate) >= today,
  );
  const utilization = vehicles
    ? Math.round((outNow.length / vehicles) * 100)
    : 0;
  const revenue = paidAgg._sum.amountPaid ?? 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">{t.dashboard.title}</h1>
        <p className="text-sm text-slate-500">{formatDay(today, intl)}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label={t.dashboard.pickupsToday} value={String(pickupsToday.length)} />
        <StatCard label={t.dashboard.returnsToday} value={String(returnsToday.length)} />
        <StatCard label={t.dashboard.outOnRoad} value={String(outNow.length)} sub={format(t.dashboard.ofFleet, { percent: utilization })} />
        <StatCard label={t.dashboard.collected} value={formatMoney(revenue)} accent sub={t.dashboard.paidToDate} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title={t.dashboard.todaysPickups} empty={t.dashboard.noPickups}>
          {pickupsToday.map((b) => (
            <MoveRow key={b.id} href={`/bookings/${b.id}`}
              name={`${b.customer.firstName} ${b.customer.lastName}`}
              vehicle={b.vehicle.name} location={b.pickupLocation}>
              <StatusBadge status={b.status} />
            </MoveRow>
          ))}
        </Panel>
        <Panel title={t.dashboard.todaysReturns} empty={t.dashboard.noReturns}>
          {returnsToday.map((b) => (
            <MoveRow key={b.id} href={`/bookings/${b.id}`}
              name={`${b.customer.firstName} ${b.customer.lastName}`}
              vehicle={b.vehicle.name} location={b.dropoffLocation}>
              <PaymentBadge status={b.paymentStatus} />
            </MoveRow>
          ))}
        </Panel>
      </div>

      <div className="card">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="font-display font-semibold text-ink">{t.dashboard.upcoming}</h2>
          <Link href="/bookings" className="text-sm font-medium text-sea hover:underline">
            {t.dashboard.allBookings}
          </Link>
        </div>
        {upcoming.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-slate-400">{t.dashboard.nothingBooked}</p>
        ) : (
          <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead className="border-b border-slate-100">
              <tr>
                <th className="th">{t.th.ref}</th><th className="th">{t.th.customer}</th>
                <th className="th">{t.th.vehicle}</th><th className="th">{t.th.dates}</th>
                <th className="th">{t.th.status}</th><th className="th">{t.th.payment}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {upcoming.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50">
                  <td className="td font-mono text-xs">
                    <Link href={`/bookings/${b.id}`} className="text-sea hover:underline">{b.reference}</Link>
                  </td>
                  <td className="td">{b.customer.firstName} {b.customer.lastName}</td>
                  <td className="td">{b.vehicle.name}</td>
                  <td className="td whitespace-nowrap">{formatDay(b.startDate, intl)} → {formatDay(b.endDate, intl)}</td>
                  <td className="td"><StatusBadge status={b.status} /></td>
                  <td className="td"><PaymentBadge status={b.paymentStatus} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
    </div>
  );
}

function Panel({
  title, empty, children,
}: {
  title: string; empty: string; children: React.ReactNode;
}) {
  const items = Array.isArray(children) ? children : [children];
  const hasItems = items.filter(Boolean).length > 0;
  return (
    <div className="card">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="font-display font-semibold text-ink">{title}</h2>
      </div>
      <div className="divide-y divide-slate-100">
        {hasItems ? (
          children
        ) : (
          <p className="px-5 py-8 text-center text-sm text-slate-400">{empty}</p>
        )}
      </div>
    </div>
  );
}

function MoveRow({
  href, name, vehicle, location, children,
}: {
  href: string; name: string; vehicle: string; location: string; children: React.ReactNode;
}) {
  return (
    <Link href={href} className="flex items-center justify-between px-5 py-3 hover:bg-slate-50">
      <div className="min-w-0">
        <div className="truncate text-sm font-medium text-ink">{name}</div>
        <div className="truncate text-xs text-slate-500">{vehicle} · {location}</div>
      </div>
      {children}
    </Link>
  );
}
