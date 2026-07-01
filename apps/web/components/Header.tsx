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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Transparent only while sitting over the homepage hero (top, not scrolled,
  // menu closed). Every other state keeps the exact sand/blur bar.
  const onHome = pathname === "/";
  const overHero = onHome && !scrolled && !menuOpen;
  const navText = overHero ? "text-white/90" : "text-ink/80";
  const hover = overHero ? "hover:text-white" : "hover:text-sea";
  const close = () => setMenuOpen(false);

  const tel = `tel:${BRAND.phone.replace(/\s/g, "")}`;

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
          <Link href="/contact" className={hover}>{t.nav.contact}</Link>
          <a href={tel} className={hover}>{BRAND.phone}</a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* language switcher lives inline on desktop, inside the menu on mobile */}
          <div className="hidden md:block">
            <LanguageSwitcher
              buttonClassName={
                overHero ? "border-white/30 bg-white/10 text-white hover:bg-white/20" : ""
              }
            />
          </div>

          <Link
            href="/fleet"
            className="btn-primary !px-4 !py-2.5 text-sm shadow-panel sm:!px-5"
          >
            {t.common.bookNow}
          </Link>

          {/* Mobile hamburger / close toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            className={`grid h-10 w-10 place-items-center rounded-lg md:hidden ${
              overHero ? "text-white hover:bg-white/10" : "text-ink hover:bg-sand-2"
            }`}
          >
            <span className="relative block h-4 w-6" aria-hidden>
              <span
                className={`absolute left-0 h-0.5 w-6 rounded bg-current transition-all duration-300 ${
                  menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-0.5 w-6 -translate-y-1/2 rounded bg-current transition-all duration-300 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-6 rounded bg-current transition-all duration-300 ${
                  menuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="absolute inset-x-0 top-full border-t border-line bg-sand shadow-panel md:hidden">
          <nav className="container-x flex flex-col gap-1 py-4 text-sm font-medium text-ink">
            <Link href="/fleet" onClick={close} className="rounded-lg px-3 py-2.5 hover:bg-sand-2">{t.nav.fleet}</Link>
            <Link href="/#why" onClick={close} className="rounded-lg px-3 py-2.5 hover:bg-sand-2">{t.nav.why}</Link>
            <Link href="/#faq" onClick={close} className="rounded-lg px-3 py-2.5 hover:bg-sand-2">{t.nav.faq}</Link>
            <Link href="/contact" onClick={close} className="rounded-lg px-3 py-2.5 hover:bg-sand-2">{t.nav.contact}</Link>
            <a href={tel} onClick={close} className="rounded-lg px-3 py-2.5 text-ink/70 hover:bg-sand-2">{BRAND.phone}</a>
            <div className="mt-2 border-t border-line px-3 pt-3">
              <LanguageSwitcher showLabel />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
