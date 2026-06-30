"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LOCATIONS } from "@rentals/db/shared";
import { useI18n } from "@/lib/i18n/provider";

function plusDays(iso: string, n: number) {
  const d = new Date(iso + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export function SearchBar({
  defaultFrom,
  defaultTo,
  defaultLocation,
  variant = "hero",
}: {
  defaultFrom: string;
  defaultTo: string;
  defaultLocation: string;
  variant?: "hero" | "inline";
}) {
  const router = useRouter();
  const { t } = useI18n();
  const today = new Date().toISOString().slice(0, 10);
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);
  const [location, setLocation] = useState(defaultLocation);

  function submit() {
    let safeTo = to;
    if (safeTo <= from) safeTo = plusDays(from, 3);
    const q = new URLSearchParams({ from, to: safeTo, location }).toString();
    router.push(`/fleet?${q}`);
  }

  return (
    <div
      className={
        variant === "hero"
          ? "rounded-xl2 border border-white/15 bg-white/95 p-4 shadow-panel backdrop-blur sm:p-5"
          : "rounded-xl2 border border-line bg-white p-4 shadow-card sm:p-5"
      }
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_auto]">
        <div>
          <label className="label" htmlFor="loc">{t.search.location}</label>
          <select
            id="loc"
            className="field"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            {LOCATIONS.map((l) => (
              <option key={l} value={l}>{t.locations[l] ?? l}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="from">{t.search.pickup}</label>
          <input
            id="from"
            type="date"
            min={today}
            className="field"
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              if (to <= e.target.value) setTo(plusDays(e.target.value, 3));
            }}
          />
        </div>
        <div>
          <label className="label" htmlFor="to">{t.search.dropoff}</label>
          <input
            id="to"
            type="date"
            min={plusDays(from, 1)}
            className="field"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
        <div className="flex items-end">
          <button onClick={submit} className="btn-ink w-full lg:w-auto">
            {t.search.search}
          </button>
        </div>
      </div>
    </div>
  );
}
