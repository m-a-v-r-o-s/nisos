"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BRAND } from "@rentals/db/shared";
import { useI18n } from "@/lib/i18n/provider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Header() {
  const { t } = useI18n();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Transparent only while sitting over the homepage hero (top, not scrolled).
  // Every other state keeps the exact current sand/blur bar.
  const onHome = pathname === "/";
  const overHero = onHome && !scrolled;
  const navText = overHero ? "text-white/90" : "text-ink/80";
  const hover = overHero ? "hover:text-white" : "hover:text-sea";

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        onHome ? "-mb-16" : ""
      } ${
        overHero
          ? "bg-transparent"
          : "border-b border-line/70 bg-sand/85 backdrop-blur"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label={`${BRAND.name} home`}>
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-white">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
              <path
                d="M3 14c4-2 6-2 9 0s5 2 9 0M5 14l1.5-4.5A2 2 0 0 1 8.4 8h7.2a2 2 0 0 1 1.9 1.5L19 14"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className={`font-display text-lg font-bold tracking-tight ${overHero ? "text-white" : "text-ink"}`}>
            {BRAND.name}
          </span>
        </Link>

        <nav className={`hidden items-center gap-7 text-sm font-medium md:flex ${navText}`}>
          <Link href="/fleet" className={hover}>{t.nav.fleet}</Link>
          <Link href="/#why" className={hover}>{t.nav.why}</Link>
          <Link href="/#faq" className={hover}>{t.nav.faq}</Link>
          <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className={hover}>
            {BRAND.phone}
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher
            buttonClassName={
              overHero ? "border-white/30 bg-white/10 text-white hover:bg-white/20" : ""
            }
          />
          <Link href="/fleet" className="btn-primary !px-5 !py-2.5">
            {t.common.bookNow}
          </Link>
        </div>
      </div>
    </header>
  );
}
