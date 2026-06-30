import Image from "next/image";
import Link from "next/link";
import { formatMoney } from "@rentals/db/shared";
import { getDictionary } from "@/lib/i18n/server";
import { format } from "@/lib/i18n/format";

export type GroupCardData = {
  slug: string;
  name: string;
  tagline: string | null;
  kind: string;
  pricePerDay: number;
  heroImage: string | null;
  available: number;
  total: number;
};

export function GroupCard({
  group,
  query,
}: {
  group: GroupCardData;
  query: string;
}) {
  const t = getDictionary();
  const kinds = t.kinds as Record<string, string>;
  return (
    <Link
      href={`/fleet?${query}#group-${group.slug}`}
      className="card group block transition hover:-translate-y-0.5 hover:shadow-panel"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-white">
        {group.heroImage && (
          <Image
            src={group.heroImage}
            alt={group.name}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="object-contain p-3 transition duration-500 group-hover:scale-105"
          />
        )}
        <span className="absolute left-3 top-3 chip bg-ink/80 text-white">
          {kinds[group.kind] ?? group.kind}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-lg font-semibold">{group.name}</h3>
          <span className="whitespace-nowrap text-sm text-ink/60">
            <span className="font-display text-base font-bold text-sea">
              {formatMoney(group.pricePerDay)}
            </span>
            {t.common.perDay}
          </span>
        </div>
        {group.tagline && (
          <p className="mt-1 text-sm text-ink/60">{group.tagline}</p>
        )}
        <div className="mt-4 flex items-center justify-between">
          <span
            className={`chip ${
              group.available > 0
                ? "bg-surf/15 text-surf-dark"
                : "bg-coral/15 text-coral"
            }`}
          >
            {group.available > 0
              ? format(t.common.free, { available: group.available, total: group.total })
              : t.common.fullyBooked}
          </span>
          <span className="text-sm font-semibold text-sea group-hover:underline">
            {t.common.view}
          </span>
        </div>
      </div>
    </Link>
  );
}
