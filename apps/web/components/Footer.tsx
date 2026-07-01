import Link from "next/link";
import { BRAND } from "@rentals/db";
import { getDictionary } from "@/lib/i18n/server";
import { format } from "@/lib/i18n/format";

export function Footer() {
  const t = getDictionary();
  return (
    <footer className="mt-24 bg-ink text-sand">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-2xl font-bold">{BRAND.name}</div>
          <p className="mt-3 max-w-sm text-sm text-sand/70">{t.brand.tagline}</p>
          <p className="mt-4 text-sm text-sand/60">
            {BRAND.address}
            <br />
            {BRAND.hours}
          </p>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-surf">
            {t.footer.explore}
          </div>
          <ul className="mt-3 space-y-2 text-sm text-sand/80">
            <li><Link href="/fleet" className="hover:text-white">{t.footer.ourFleet}</Link></li>
            <li><Link href="/#why" className="hover:text-white">{t.footer.why}</Link></li>
            <li><Link href="/#faq" className="hover:text-white">{t.footer.faq}</Link></li>
            <li><Link href="/contact" className="hover:text-white">{t.nav.contact}</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-surf">
            {t.footer.contact}
          </div>
          <ul className="mt-3 space-y-2 text-sm text-sand/80">
            <li><a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="hover:text-white">{BRAND.phone}</a></li>
            <li><a href={`mailto:${BRAND.email}`} className="hover:text-white">{BRAND.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-5 text-xs text-sand/50 sm:flex-row sm:justify-between">
          <span>{format(t.footer.rights, { year: new Date().getFullYear(), brand: BRAND.name })}</span>
          <span>{t.footer.demo}</span>
        </div>
      </div>
    </footer>
  );
}
