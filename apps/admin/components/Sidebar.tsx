"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n/provider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const NAV = [
  { href: "/", key: "dashboard", icon: "M3 12l9-9 9 9M5 10v10h14V10" },
  { href: "/bookings", key: "bookings", icon: "M4 5h16M4 12h16M4 19h16" },
  { href: "/calendar", key: "calendar", icon: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4" },
  { href: "/fleet", key: "fleet", icon: "M5 13l1.5-4.5A2 2 0 0 1 8.4 7h7.2a2 2 0 0 1 1.9 1.5L19 13v5H5zM7 18v2M17 18v2" },
  { href: "/customers", key: "customers", icon: "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM3 21a7 7 0 0 1 18 0" },
] as const;

export function Sidebar() {
  const path = usePathname();
  const { t } = useI18n();
  const isActive = (href: string) =>
    href === "/" ? path === "/" : path.startsWith(href);

  return (
    <aside className="hidden w-60 shrink-0 flex-col bg-ink px-3 py-5 text-sand lg:flex">
      <div className="px-3 pb-6">
        <div className="font-display text-lg font-bold text-white">Nisos</div>
        <div className="text-xs text-sand/50">{t.layout.opsConsole}</div>
      </div>
      <nav className="flex-1 space-y-1">
        {NAV.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
              isActive(n.href)
                ? "bg-white/10 font-medium text-white"
                : "text-sand/70 hover:bg-white/5 hover:text-white"
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d={n.icon} />
            </svg>
            {t.nav[n.key]}
          </Link>
        ))}
      </nav>
      <div className="mt-3 px-1">
        <LanguageSwitcher className="w-full" openUp />
      </div>
      <form action="/api/logout" method="post" className="mt-2 px-1">
        <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-sand/60 hover:bg-white/5 hover:text-white">
          {t.layout.signOut}
        </button>
      </form>
    </aside>
  );
}
