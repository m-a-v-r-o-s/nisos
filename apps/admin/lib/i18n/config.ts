// Locale configuration for the operations console. The admin only offers
// English + Greek. Shared by server + client code, so no server-only imports.

export const LOCALES = ["en", "el"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_COOKIE = "nisos_admin_locale";

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  el: "Ελληνικά",
};

// App locale → BCP-47 tag for Intl date/number formatting.
export const INTL_LOCALE: Record<Locale, string> = {
  en: "en-GB",
  el: "el-GR",
};

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}
