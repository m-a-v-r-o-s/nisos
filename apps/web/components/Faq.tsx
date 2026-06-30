"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/provider";

export function Faq() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-line rounded-xl2 border border-line bg-white">
      {t.faq.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-display font-semibold">{f.q}</span>
              <span
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border border-line text-sea transition ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden
              >
                +
              </span>
            </button>
            {isOpen && (
              <p className="px-5 pb-5 text-sm leading-relaxed text-ink/70">{f.a}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
