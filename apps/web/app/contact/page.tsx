import { BRAND } from "@rentals/db";
import { getDictionary } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

export default function ContactPage() {
  const t = getDictionary();
  const c = t.contact;
  const tel = `tel:${BRAND.phone.replace(/\s/g, "")}`;
  const wa = `https://wa.me/${BRAND.phone.replace(/[^0-9]/g, "")}`;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    BRAND.address,
  )}&output=embed`;

  return (
    <div className="bg-sand">
      {/* header */}
      <div className="border-b border-line bg-white">
        <div className="container-x py-12">
          <p className="eyebrow text-surf-dark">{BRAND.name}</p>
          <h1 className="mt-2 font-display text-4xl font-bold">{c.title}</h1>
          <p className="mt-3 max-w-2xl text-ink/65">{c.intro}</p>
        </div>
      </div>

      <div className="container-x grid gap-8 py-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* reach us */}
        <div className="card p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold">{c.reachUs}</h2>
          <dl className="mt-6 space-y-5">
            <Item icon={ICON.pin} label={c.address}>
              {BRAND.address}
            </Item>
            <Item icon={ICON.phone} label={c.phone}>
              <a href={tel} className="hover:text-sea">{BRAND.phone}</a>
            </Item>
            <Item icon={ICON.mail} label={c.email}>
              <a href={`mailto:${BRAND.email}`} className="hover:text-sea">{BRAND.email}</a>
            </Item>
            <Item icon={ICON.clock} label={c.hours}>
              {BRAND.hours}
            </Item>
          </dl>
        </div>

        {/* prominent call / whatsapp */}
        <div className="card flex flex-col justify-center bg-ink p-6 text-sand sm:p-8">
          <h2 className="font-display text-xl font-bold text-white">{c.talkNow}</h2>
          <p className="mt-2 text-sm leading-relaxed text-sand/70">{c.talkBody}</p>
          <div className="mt-6 space-y-3">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3.5 font-semibold text-white transition hover:bg-[#1ebe5d]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              {c.whatsappCta}
            </a>
            <a
              href={tel}
              className="flex items-center justify-center gap-2.5 rounded-full border border-white/25 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92z" />
              </svg>
              {c.call} · {BRAND.phone}
            </a>
          </div>
        </div>
      </div>

      {/* about + location */}
      <div className="container-x grid gap-8 pb-12 md:grid-cols-2">
        <div>
          <p className="eyebrow">{c.aboutHeading}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink/70">{c.aboutBody}</p>
        </div>
        <div>
          <p className="eyebrow">{c.locationHeading}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink/70">{c.locationBody}</p>
        </div>
      </div>

      {/* map */}
      <div className="container-x pb-16">
        <div className="overflow-hidden rounded-xl2 border border-line bg-white">
          <iframe
            title={c.locationHeading}
            src={mapSrc}
            className="block h-[360px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}

function Item({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-sand-2 text-sea">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          {icon}
        </svg>
      </span>
      <div>
        <dt className="text-xs font-semibold uppercase tracking-wide text-ink/45">{label}</dt>
        <dd className="mt-0.5 text-sm font-medium text-ink">{children}</dd>
      </div>
    </div>
  );
}

const ICON = {
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
};
