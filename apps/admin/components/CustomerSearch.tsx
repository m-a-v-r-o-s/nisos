"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n/provider";

export function CustomerSearch({ initial }: { initial: string }) {
  const router = useRouter();
  const { t } = useI18n();
  const [value, setValue] = useState(initial);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  function go(next: string) {
    const q = next.trim();
    router.replace(q ? `/customers?q=${encodeURIComponent(q)}` : "/customers");
  }

  function onChange(v: string) {
    setValue(v);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => go(v), 300);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        clearTimeout(timer.current);
        go(value);
      }}
      className="relative max-w-md"
      role="search"
    >
      <svg
        viewBox="0 0 24 24"
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t.customers.searchPlaceholder}
        aria-label={t.customers.searchPlaceholder}
        className="field !pl-9"
      />
    </form>
  );
}
