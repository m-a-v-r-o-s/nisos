"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/provider";
import { LOCALES, LOCALE_LABELS, LOCALE_COOKIE, type Locale } from "@/lib/i18n/config";

const FLAG: Record<Locale, string> = { en: "gb", el: "gr" };

export function LanguageSwitcher({
  className = "",
  buttonClassName = "",
  openUp = false,
}: {
  className?: string;
  buttonClassName?: string;
  openUp?: boolean;
}) {
  const router = useRouter();
  const { locale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  function change(next: Locale) {
    document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=31536000;samesite=lax`;
    setOpen(false);
    router.refresh();
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Language"
        className={`flex w-full items-center gap-2 rounded-lg border px-2.5 py-1.5 text-sm transition ${
          buttonClassName || "border-white/15 bg-white/5 text-sand/90 hover:bg-white/10"
        }`}
      >
        <Flag code={FLAG[locale]} />
        <span>{LOCALE_LABELS[locale]}</span>
        <svg viewBox="0 0 24 24" className={`ml-auto h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className={`absolute right-0 z-50 w-full min-w-[10rem] overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg ${
            openUp ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          {LOCALES.map((l) => (
            <li key={l}>
              <button
                type="button"
                role="option"
                aria-selected={l === locale}
                onClick={() => change(l)}
                className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm hover:bg-slate-50 ${
                  l === locale ? "font-semibold text-sea" : "text-slate-700"
                }`}
              >
                <Flag code={FLAG[l]} />
                {LOCALE_LABELS[l]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Flag({ code }: { code: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={`/flags/${code}.svg`}
      alt=""
      width={20}
      height={14}
      className="h-3.5 w-5 shrink-0 rounded-sm object-cover ring-1 ring-black/10"
    />
  );
}
