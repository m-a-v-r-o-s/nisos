"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n/provider";

const KEY = "nisos_cookie_consent";

export function CookieBanner() {
  const { t } = useI18n();
  const c = t.cookies;
  const [show, setShow] = useState(false);
  const [managing, setManaging] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    try {
      // Only prompt if no choice has been recorded yet.
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      /* localStorage unavailable — don't show */
    }
  }, []);

  if (!show) return null;

  // Persist the choice. Non-essential (analytics) cookies stay off unless opted
  // in; a future analytics script must read this flag before loading.
  function save(analyticsOn: boolean) {
    try {
      localStorage.setItem(
        KEY,
        JSON.stringify({ necessary: true, analytics: analyticsOn, ts: Date.now() }),
      );
    } catch {
      /* ignore */
    }
    setShow(false);
  }

  return (
    <div className="fixed inset-x-4 bottom-24 z-50 sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-md">
      <div className="rounded-xl2 border border-line bg-white p-5 shadow-panel">
        <p className="eyebrow text-surf-dark">{c.title}</p>

        {!managing ? (
          <>
            <p className="mt-2 text-sm leading-relaxed text-ink/75">{c.message}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button onClick={() => save(true)} className="btn-primary !px-5 !py-2">
                {c.acceptAll}
              </button>
              <button onClick={() => save(false)} className="btn-ghost !px-5 !py-2">
                {c.rejectAll}
              </button>
            </div>
            <button
              type="button"
              onClick={() => setManaging(true)}
              className="mt-3 text-xs font-semibold text-sea hover:underline"
            >
              {c.manage}
            </button>
          </>
        ) : (
          <>
            <div className="mt-3 space-y-3">
              {/* Strictly necessary — always on, not toggleable */}
              <label className="flex items-start gap-3">
                <input type="checkbox" checked disabled className="mt-0.5 h-4 w-4 accent-surf" />
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-2 text-sm font-semibold text-ink">
                    {c.necessary}
                    <span className="chip bg-surf/15 px-2 py-0.5 text-[10px] uppercase tracking-wide text-surf-dark">
                      {c.alwaysOn}
                    </span>
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-ink/55">
                    {c.necessaryDesc}
                  </span>
                </span>
              </label>

              {/* Analytics — optional, off by default */}
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-surf"
                />
                <span className="min-w-0">
                  <span className="text-sm font-semibold text-ink">{c.analytics}</span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-ink/55">
                    {c.analyticsDesc}
                  </span>
                </span>
              </label>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button onClick={() => save(analytics)} className="btn-ghost !px-5 !py-2">
                {c.save}
              </button>
              <button onClick={() => save(true)} className="btn-primary !px-5 !py-2">
                {c.acceptAll}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
