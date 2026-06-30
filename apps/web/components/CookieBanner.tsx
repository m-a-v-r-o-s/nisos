"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n/provider";

const KEY = "nisos_cookie_consent";

export function CookieBanner() {
  const { t } = useI18n();
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      /* localStorage unavailable — just don't show */
    }
  }, []);

  if (!show) return null;

  function accept() {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    setShow(false);
  }

  return (
    <div className="fixed inset-x-4 bottom-24 z-50 sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-sm">
      <div className="rounded-xl2 border border-line bg-white p-4 shadow-panel">
        <p className="text-sm leading-relaxed text-ink/75">{t.cookies.message}</p>
        <div className="mt-3 flex justify-end">
          <button onClick={accept} className="btn-primary !px-5 !py-2">
            {t.cookies.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
