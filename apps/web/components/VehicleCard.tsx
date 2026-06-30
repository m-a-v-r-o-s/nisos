import Image from "next/image";
import Link from "next/link";
import { formatMoney } from "@rentals/db/shared";
import { getDictionary } from "@/lib/i18n/server";
import { format } from "@/lib/i18n/format";

export type VehicleCardData = {
  slug: string;
  name: string;
  image: string | null;
  seats: number | null;
  doors: number | null;
  transmission: string | null;
  fuel: string | null;
  engineCc: number | null;
  luggage: number | null;
  groupName: string;
  groupKind: string;
  pricePerDay: number;
  available: boolean;
};

function Spec({ label }: { label: string }) {
  return (
    <span className="chip bg-sand-2 text-ink/70">{label}</span>
  );
}

export function VehicleCard({
  v,
  query,
}: {
  v: VehicleCardData;
  query: string;
}) {
  const t = getDictionary();
  const fuels = t.fuels as Record<string, string>;
  const specs: string[] = [];
  if (v.seats) specs.push(format(t.common.seats, { count: v.seats }));
  if (v.transmission && v.transmission !== "n/a")
    specs.push(v.transmission === "automatic" ? t.common.auto : t.common.manual);
  if (v.engineCc) specs.push(`${v.engineCc}cc`);
  if (v.luggage) specs.push(format(t.common.bags, { count: v.luggage }));
  if (v.fuel && v.fuel !== "n/a") specs.push(fuels[v.fuel] ?? v.fuel);

  return (
    <div className="card flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden bg-white">
        {v.image && (
          <Image
            src={v.image}
            alt={v.name}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="object-contain p-2"
          />
        )}
        {!v.available && (
          <div className="absolute inset-0 grid place-items-center bg-ink/55">
            <span className="chip bg-white/90 text-ink">{t.common.bookedForDates}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold">{v.name}</h3>
        <p className="text-xs uppercase tracking-wide text-ink/45">{v.groupName}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {specs.map((s) => (
            <Spec key={s} label={s} />
          ))}
        </div>

        <div className="mt-auto flex items-end justify-between pt-5">
          <div>
            <div className="font-display text-xl font-bold text-sea">
              {formatMoney(v.pricePerDay)}
            </div>
            <div className="text-xs text-ink/50">{t.common.perDayLong}</div>
          </div>
          {v.available ? (
            <Link href={`/book/${v.slug}?${query}`} className="btn-primary !py-2.5">
              {t.common.book}
            </Link>
          ) : (
            <span className="btn-ghost cursor-not-allowed opacity-60 !py-2.5">
              {t.common.unavailable}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
