"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n/provider";
import { NAV } from "@/components/nav";

export function MobileNav() {
  const { t } = useI18n();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  // Close on route change and on Escape.
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Menu"
        aria-expanded={open}
        className="grid h-9 w-9 place-items-center rounded-lg text-slate-600 hover:bg-slate-100"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-64 max-w-[82%] flex-col bg-ink px-3 py-5 text-sand shadow-panel">
            <div className="flex items-start justify-between px-3 pb-6">
              <div>
                <div className="font-display text-lg font-bold text-white">Nisos</div>
                <div className="text-xs text-sand/50">{t.layout.opsConsole}</div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="grid h-8 w-8 place-items-center rounded-lg text-sand/70 hover:bg-white/10"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 space-y-1">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
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

            <form action="/api/logout" method="post" className="px-1">
              <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-sand/60 hover:bg-white/5 hover:text-white">
                {t.layout.signOut}
              </button>
            </form>
          </aside>
        </div>
      )}
    </>
  );
}
