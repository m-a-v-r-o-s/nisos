import {
  prisma,
  getGroupVehicleAvailability,
  formatDay,
  rentalDays,
} from "@rentals/db";
import { parseDates, dateQuery } from "@/lib/search";
import { SearchBar } from "@/components/SearchBar";
import { FleetFilters } from "@/components/FleetFilters";
import { VehicleCard, type VehicleCardData } from "@/components/VehicleCard";
import { getDictionary, getLocale } from "@/lib/i18n/server";
import { INTL_LOCALE } from "@/lib/i18n/config";
import { format } from "@/lib/i18n/format";

export const dynamic = "force-dynamic";

export default async function FleetPage({
  searchParams,
}: {
  searchParams: { [k: string]: string | string[] | undefined };
}) {
  const locale = getLocale();
  const t = getDictionary(locale);
  const kinds = t.kinds as Record<string, string>;
  const intl = INTL_LOCALE[locale];
  const dates = parseDates(searchParams);
  const query = dateQuery(dates);
  const days = rentalDays(dates.from, dates.to);

  const param = (k: string) =>
    Array.isArray(searchParams[k]) ? (searchParams[k] as string[])[0] : (searchParams[k] as string | undefined);
  const category = param("category");
  const transmission = param("transmission");

  const groups = await prisma.group.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      vehicles: { where: { active: true }, orderBy: { sortOrder: "asc" } },
    },
  });

  // distinct vehicle categories (by kind), in display order, for the filter bar
  const categories = groups.reduce<{ kind: string; label: string }[]>((acc, g) => {
    if (!acc.some((c) => c.kind === g.kind)) {
      acc.push({ kind: g.kind, label: kinds[g.kind] ?? g.kind });
    }
    return acc;
  }, []);

  // apply category (kind) + transmission filters
  const filteredGroups = groups
    .filter((g) => !category || g.kind === category)
    .map((g) => ({
      ...g,
      vehicles: g.vehicles.filter((v) => !transmission || v.transmission === transmission),
    }))
    .filter((g) => g.vehicles.length > 0);

  // availability map per group (only for the groups we'll render)
  const availByGroup = new Map<string, Map<string, boolean>>();
  await Promise.all(
    filteredGroups.map(async (g) => {
      const list = await getGroupVehicleAvailability(g.id, dates.from, dates.to);
      availByGroup.set(g.id, new Map(list.map((x) => [x.vehicleId, x.available])));
    }),
  );

  return (
    <div className="bg-sand">
      <div className="border-b border-line bg-white">
        <div className="container-x py-8">
          <h1 className="font-display text-3xl font-bold">{t.fleet.title}</h1>
          <p className="mt-1 text-sm text-ink/60">
            {format(t.fleet.showing, {
              from: formatDay(dates.from, intl),
              to: formatDay(dates.to, intl),
              days,
              unit: days === 1 ? t.common.day : t.common.days,
              location: t.locations[dates.location as keyof typeof t.locations] ?? dates.location,
            })}
          </p>
          <div className="mt-5">
            <SearchBar
              defaultFrom={dates.fromStr}
              defaultTo={dates.toStr}
              defaultLocation={dates.location}
              variant="inline"
            />
          </div>
          <div className="mt-5">
            <FleetFilters
              dates={{ fromStr: dates.fromStr, toStr: dates.toStr, location: dates.location }}
              category={category}
              transmission={transmission}
              categories={categories}
            />
          </div>
        </div>
      </div>

      <div className="container-x space-y-16 py-12">
        {filteredGroups.length === 0 && (
          <p className="py-16 text-center text-sm text-ink/55">{t.fleet.noResults}</p>
        )}
        {filteredGroups.map((g) => {
          const amap = availByGroup.get(g.id)!;
          const freeCount = g.vehicles.filter((v) => amap.get(v.id) ?? true).length;
          return (
            <section key={g.id} id={`group-${g.slug}`} className="scroll-mt-24">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h2 className="font-display text-2xl font-bold">{g.name}</h2>
                  {g.tagline && (
                    <p className="text-sm text-ink/55">{g.tagline}</p>
                  )}
                </div>
                <span
                  className={`chip ${
                    freeCount > 0 ? "bg-surf/15 text-surf-dark" : "bg-coral/15 text-coral"
                  }`}
                >
                  {freeCount > 0
                    ? format(t.common.availableCount, { count: freeCount })
                    : t.common.fullyBooked}
                </span>
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {g.vehicles.map((v) => {
                  const card: VehicleCardData = {
                    slug: v.slug,
                    name: v.name,
                    image: v.image,
                    seats: v.seats,
                    doors: v.doors,
                    transmission: v.transmission,
                    fuel: v.fuel,
                    engineCc: v.engineCc,
                    luggage: v.luggage,
                    groupName: g.name,
                    groupKind: g.kind,
                    pricePerDay: g.pricePerDay,
                    available: amap.get(v.id) ?? true,
                  };
                  return <VehicleCard key={v.id} v={card} query={query} />;
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
