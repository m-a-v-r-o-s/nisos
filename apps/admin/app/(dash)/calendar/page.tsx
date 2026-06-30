import Link from "next/link";
import {
  prisma,
  toDay,
  addDays,
  isoDay,
  rangesOverlap,
  BLOCKING_STATUSES,
} from "@rentals/db";
import { getDictionary, getLocale } from "@/lib/i18n/server";
import { INTL_LOCALE } from "@/lib/i18n/config";
import { format } from "@/lib/i18n/format";

export const dynamic = "force-dynamic";

const DAYS = 14;

export default async function CalendarPage() {
  const locale = getLocale();
  const t = getDictionary(locale);
  const intl = INTL_LOCALE[locale];
  const start = toDay(new Date());
  const end = addDays(start, DAYS - 1);
  const days = Array.from({ length: DAYS }, (_, i) => addDays(start, i));

  const groups = await prisma.group.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      vehicles: {
        where: { active: true },
        orderBy: { sortOrder: "asc" },
        include: {
          bookings: {
            where: {
              status: { in: BLOCKING_STATUSES },
              startDate: { lte: end },
              endDate: { gte: start },
            },
            include: { customer: true },
          },
          blockedDates: {
            where: { startDate: { lte: end }, endDate: { gte: start } },
          },
        },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">{t.calendar.title}</h1>
        <p className="text-sm text-slate-500">{format(t.calendar.nextDays, { count: DAYS })}</p>
      </div>

      <div className="flex gap-4 text-xs text-slate-500">
        <Legend className="bg-sea" label={t.calendar.booked} />
        <Legend className="bg-amber-300" label={t.calendar.maintenance} />
        <Legend className="bg-emerald-100 border border-emerald-200" label={t.calendar.free} />
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-white px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                {t.calendar.vehicle}
              </th>
              {days.map((d) => (
                <th key={isoDay(d)} className="px-1 py-2 text-center text-[11px] font-medium text-slate-500">
                  <div>{d.toLocaleDateString(intl, { weekday: "short", timeZone: "UTC" })}</div>
                  <div className="text-slate-800">{d.getUTCDate()}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groups.map((g) => (
              <RowGroup key={g.id} name={g.name}>
                {g.vehicles.map((v) => (
                  <tr key={v.id} className="border-t border-slate-100">
                    <td className="sticky left-0 z-10 bg-white px-4 py-2 text-sm font-medium text-ink">
                      {v.name}
                    </td>
                    {days.map((d) => {
                      const block = v.blockedDates.find((b) =>
                        rangesOverlap(d, d, b.startDate, b.endDate),
                      );
                      const booking = v.bookings.find((b) =>
                        rangesOverlap(d, d, b.startDate, b.endDate),
                      );
                      let cls = "bg-emerald-50";
                      let title = t.calendar.free;
                      let content: React.ReactNode = null;
                      if (block) {
                        cls = "bg-amber-300";
                        title = format(t.calendar.maintenanceReason, { reason: block.reason ?? "" });
                      } else if (booking) {
                        cls = "bg-sea";
                        title = `${booking.customer.firstName} ${booking.customer.lastName} · ${booking.reference}`;
                        content = (
                          <Link href={`/bookings/${booking.id}`} className="block h-full w-full" title={title} />
                        );
                      }
                      return (
                        <td key={isoDay(d)} className="px-0.5 py-0.5">
                          <div className={`h-7 rounded ${cls}`} title={title}>{content}</div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </RowGroup>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RowGroup({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <>
      <tr className="bg-slate-50">
        <td colSpan={DAYS + 1} className="sticky left-0 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
          {name}
        </td>
      </tr>
      {children}
    </>
  );
}

function Legend({ className, label }: { className: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`inline-block h-3 w-3 rounded ${className}`} />
      {label}
    </span>
  );
}
