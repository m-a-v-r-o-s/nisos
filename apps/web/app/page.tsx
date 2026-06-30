import Image from "next/image";
import Link from "next/link";
import {
  prisma,
  countGroupAvailability,
  BRAND,
} from "@rentals/db";
import { parseDates, dateQuery } from "@/lib/search";
import { SearchBar } from "@/components/SearchBar";
import { GroupCard, type GroupCardData } from "@/components/GroupCard";
import { Faq } from "@/components/Faq";
import { getDictionary } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

const HERO = "/2a1f1526-b787-499b-91aa-04e67567e576.png";

// Line icons for the feature grid, in the same order as t.home.features.
const FEATURE_ICONS: React.ReactNode[] = [
  // vehicle
  <>
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
    <path d="M14 17H9" />
    <circle cx="6.5" cy="17.5" r="2.5" />
    <circle cx="16.5" cy="17.5" r="2.5" />
  </>,
  // book online (phone)
  <>
    <rect x="7" y="2" width="10" height="20" rx="2" />
    <path d="M11 18h2" />
  </>,
  // pricing (tag)
  <>
    <path d="M12.6 2.6 21 11a2 2 0 0 1 0 2.8l-7.2 7.2a2 2 0 0 1-2.8 0L2.6 12.6A2 2 0 0 1 2 11.2V4a2 2 0 0 1 2-2h7.2a2 2 0 0 1 1.4.6Z" />
    <circle cx="7.5" cy="7.5" r="1.5" />
  </>,
  // support (headset)
  <>
    <path d="M3 14v-2a9 9 0 0 1 18 0v2" />
    <path d="M21 16a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2zM3 16a2 2 0 0 0 2 2h1v-6H5a2 2 0 0 0-2 2z" />
  </>,
];

export default async function HomePage({
  searchParams,
}: {
  searchParams: { [k: string]: string | string[] | undefined };
}) {
  const t = getDictionary();
  const dates = parseDates(searchParams);
  const query = dateQuery(dates);

  const groups = await prisma.group.findMany({ orderBy: { sortOrder: "asc" } });
  const cards: GroupCardData[] = await Promise.all(
    groups.map(async (g) => {
      const { available, total } = await countGroupAvailability(
        g.id,
        dates.from,
        dates.to,
      );
      return {
        slug: g.slug,
        name: g.name,
        tagline: g.tagline,
        kind: g.kind,
        pricePerDay: g.pricePerDay,
        heroImage: g.heroImage,
        available,
        total,
      };
    }),
  );

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="relative min-h-screen overflow-hidden">
          <Image src={HERO} alt="" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/35 to-ink/75" />
          <div className="container-x relative flex min-h-screen flex-col justify-between pb-8 pt-28">
            <div className="max-w-2xl text-white">
              <p className="eyebrow text-surf">{BRAND.address}</p>
              <h1 className="mt-3 font-display text-4xl font-bold leading-[1.05] sm:text-6xl">
                {t.brand.tagline}
              </h1>
              <p className="mt-4 max-w-xl text-base text-white/80 sm:text-lg">
                {t.home.heroLead}
              </p>
            </div>
            <div>
              <SearchBar
                defaultFrom={dates.fromStr}
                defaultTo={dates.toStr}
                defaultLocation={dates.location}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Groups */}
      <section className="container-x py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">{t.home.fleetEyebrow}</p>
            <h2 className="mt-2 font-display text-3xl font-bold">
              {t.home.fleetHeading}
            </h2>
          </div>
          <Link href={`/fleet?${query}`} className="hidden btn-ghost sm:inline-flex">
            {t.home.seeAll}
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((g) => (
            <GroupCard key={g.slug} group={g} query={query} />
          ))}
        </div>
      </section>

      {/* Why */}
      <section id="why" className="bg-white py-16">
        <div className="container-x">
          <p className="eyebrow">{t.home.whyEyebrow}</p>
          <h2 className="mt-2 max-w-xl font-display text-3xl font-bold">
            {t.home.whyHeading}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {t.home.why.map((w, i) => (
              <div key={w.title} className="rounded-xl2 border border-line p-6">
                <div className="font-display text-sm font-bold text-surf-dark">
                  0{i + 1}
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold">
                  {w.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{w.body}</p>
              </div>
            ))}
          </div>

          {/* Feature grid */}
          <div className="mt-20 border-t border-line pt-16 text-center">
            <h3 className="mx-auto max-w-3xl font-display text-3xl font-bold leading-tight sm:text-4xl">
              {t.home.featuresHeading}
            </h3>
            <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {t.home.features.map((f, i) => (
                <div key={f.title} className="flex flex-col items-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-9 w-9 text-ink"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    {FEATURE_ICONS[i]}
                  </svg>
                  <h4 className="mt-4 font-display text-base font-semibold">{f.title}</h4>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink/60">{f.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-20 border-t border-line pt-16">
            <div className="text-center">
              <p className="eyebrow">{t.home.reviewsEyebrow}</p>
              <h3 className="mt-2 font-display text-3xl font-bold">{t.home.reviewsHeading}</h3>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {t.home.reviews.map((r) => (
                <figure
                  key={r.name}
                  className="flex flex-col rounded-xl2 border border-line bg-sand-2/40 p-6"
                >
                  <Stars />
                  <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink/75">
                    “{r.quote}”
                  </blockquote>
                  <figcaption className="mt-4 text-sm font-semibold text-ink">{r.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container-x py-16">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">{t.home.faqEyebrow}</p>
            <h2 className="mt-2 font-display text-3xl font-bold">
              {t.home.faqHeading}
            </h2>
            <p className="mt-4 text-sm text-ink/65">
              {t.home.faqCall}{" "}
              <a className="font-semibold text-sea" href={`tel:${BRAND.phone.replace(/\s/g, "")}`}>
                {BRAND.phone}
              </a>
              .
            </p>
          </div>
          <Faq />
        </div>
      </section>
    </>
  );
}

function Stars() {
  return (
    <div className="flex gap-0.5 text-surf-dark" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 7.1-1.01z" />
        </svg>
      ))}
    </div>
  );
}
