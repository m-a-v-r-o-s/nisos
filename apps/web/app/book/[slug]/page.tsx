import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma, formatMoney } from "@rentals/db";
import { parseDates } from "@/lib/search";
import { BookingForm } from "@/components/BookingForm";
import { getDictionary } from "@/lib/i18n/server";
import { format } from "@/lib/i18n/format";

export const dynamic = "force-dynamic";

export default async function BookPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [k: string]: string | string[] | undefined };
}) {
  const t = getDictionary();
  const fuels = t.fuels as Record<string, string>;
  const dates = parseDates(searchParams);
  const error = Array.isArray(searchParams.error)
    ? searchParams.error[0]
    : searchParams.error;

  const vehicle = await prisma.vehicle.findUnique({
    where: { slug: params.slug },
    include: { group: true },
  });
  if (!vehicle) notFound();

  const specs: string[] = [];
  if (vehicle.seats) specs.push(format(t.common.seats, { count: vehicle.seats }));
  if (vehicle.transmission && vehicle.transmission !== "n/a")
    specs.push(vehicle.transmission === "automatic" ? t.common.auto : t.common.manual);
  if (vehicle.engineCc) specs.push(`${vehicle.engineCc}cc`);
  if (vehicle.luggage) specs.push(format(t.common.bags, { count: vehicle.luggage }));
  if (vehicle.fuel && vehicle.fuel !== "n/a") specs.push(fuels[vehicle.fuel] ?? vehicle.fuel);

  return (
    <div className="bg-sand">
      <div className="container-x py-8">
        <Link href="/fleet" className="text-sm text-ink/55 hover:text-sea">
          {t.common.backToFleet}
        </Link>

        <div className="mt-4 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="card overflow-hidden">
            <div className="relative aspect-[16/10] bg-white">
              {vehicle.image && (
                <Image src={vehicle.image} alt={vehicle.name} fill className="object-contain p-3" sizes="60vw" />
              )}
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="eyebrow">{vehicle.group.name}</p>
            <h1 className="mt-2 font-display text-3xl font-bold">{vehicle.name}</h1>
            {vehicle.group.description && (
              <p className="mt-3 text-sm leading-relaxed text-ink/65">
                {vehicle.group.description}
              </p>
            )}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {specs.map((s) => (
                <span key={s} className="chip bg-white text-ink/70 border border-line">{s}</span>
              ))}
            </div>
            <div className="mt-5 font-display text-2xl font-bold text-sea">
              {formatMoney(vehicle.group.pricePerDay)}
              <span className="text-sm font-normal text-ink/50">{t.bookingForm.perDaySuffix}</span>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-xl2 border border-line bg-sand-2/40 p-6 sm:p-8">
          <BookingForm
            vehicleSlug={vehicle.slug}
            vehicleName={vehicle.name}
            pricePerDay={vehicle.group.pricePerDay}
            deposit={vehicle.group.deposit}
            initialFrom={dates.fromStr}
            initialTo={dates.toStr}
            initialLocation={dates.location}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}
