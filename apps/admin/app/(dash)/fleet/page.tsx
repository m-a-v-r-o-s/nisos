import {
  prisma,
  formatMoney,
  formatDay,
} from "@rentals/db";
import {
  toggleVehicle,
  updateGroupPrice,
  addBlock,
  removeBlock,
} from "../actions";
import { getDictionary, getLocale } from "@/lib/i18n/server";
import { INTL_LOCALE } from "@/lib/i18n/config";
import { format } from "@/lib/i18n/format";

export const dynamic = "force-dynamic";

export default async function FleetPage() {
  const locale = getLocale();
  const t = getDictionary(locale);
  const intl = INTL_LOCALE[locale];
  const kinds = t.kinds as Record<string, string>;
  const groups = await prisma.group.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      vehicles: {
        orderBy: { sortOrder: "asc" },
        include: {
          blockedDates: { orderBy: { startDate: "asc" } },
        },
      },
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">{t.fleet.title}</h1>
        <p className="text-sm text-slate-500">
          {format(t.fleet.summary, { groups: groups.length, vehicles: groups.reduce((n, g) => n + g.vehicles.length, 0) })}
        </p>
      </div>

      {groups.map((g) => (
        <section key={g.id} className="card overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4">
            <div>
              <h2 className="font-display font-semibold text-ink">{g.name}</h2>
              <p className="text-xs text-slate-500">{format(t.fleet.vehiclesKind, { count: g.vehicles.length, kind: kinds[g.kind] ?? g.kind })}</p>
            </div>
            <form action={updateGroupPrice} className="flex items-end gap-2">
              <input type="hidden" name="id" value={g.id} />
              <div>
                <label className="label">{t.fleet.pricePerDay}</label>
                <input name="price" type="number" min="1" step="1"
                  defaultValue={(g.pricePerDay / 100).toFixed(0)}
                  className="field w-28" />
              </div>
              <button className="btn-soft">{t.fleet.save}</button>
            </form>
          </div>

          <div className="divide-y divide-slate-100">
            {g.vehicles.map((v) => (
              <div key={v.id} className="px-5 py-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className={`h-2.5 w-2.5 rounded-full ${v.active ? "bg-emerald-500" : "bg-slate-300"}`} />
                    <div>
                      <div className="text-sm font-medium text-ink">{v.name}</div>
                      <div className="text-xs text-slate-400">{format(t.fleet.plate, { plate: v.plate ?? t.common.dash, state: v.active ? t.fleet.listed : t.fleet.hidden })}</div>
                    </div>
                  </div>
                  <form action={toggleVehicle}>
                    <input type="hidden" name="id" value={v.id} />
                    <button className="btn-soft">{v.active ? t.fleet.hide : t.fleet.makeAvailable}</button>
                  </form>
                </div>

                {/* maintenance blocks */}
                <div className="mt-3 rounded-lg bg-slate-50 p-3">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t.fleet.blocks}</div>
                  {v.blockedDates.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {v.blockedDates.map((bd) => (
                        <li key={bd.id} className="flex items-center justify-between text-xs text-slate-600">
                          <span>{formatDay(bd.startDate, intl)} → {formatDay(bd.endDate, intl)} · {bd.reason}</span>
                          <form action={removeBlock}>
                            <input type="hidden" name="id" value={bd.id} />
                            <button className="text-red-500 hover:underline">{t.fleet.remove}</button>
                          </form>
                        </li>
                      ))}
                    </ul>
                  )}
                  <form action={addBlock} className="mt-2 flex flex-wrap items-end gap-2">
                    <input type="hidden" name="vehicleId" value={v.id} />
                    <div>
                      <label className="label">{t.fleet.from}</label>
                      <input name="from" type="date" className="field" required />
                    </div>
                    <div>
                      <label className="label">{t.fleet.to}</label>
                      <input name="to" type="date" className="field" required />
                    </div>
                    <div className="min-w-[140px] flex-1">
                      <label className="label">{t.fleet.reason}</label>
                      <input name="reason" className="field" placeholder={t.fleet.servicePlaceholder} />
                    </div>
                    <button className="btn-soft">{t.fleet.blockDates}</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
