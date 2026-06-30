// Locale configuration for the public site. Shared by server + client code,
// so this file must NOT import next/headers or any server-only API.

export const LOCALES = ["en", "el", "de", "it", "pl", "fr"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

// Cookie that holds the visitor's chosen language.
export const LOCALE_COOKIE = "nisos_locale";

// Native names shown in the language switcher.
export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  el: "Ελληνικά",
  de: "Deutsch",
  it: "Italiano",
  pl: "Polski",
  fr: "Français",
};

// App locale → BCP-47 tag for Intl date/number formatting.
export const INTL_LOCALE: Record<Locale, string> = {
  en: "en-GB",
  el: "el-GR",
  de: "de-DE",
  it: "it-IT",
  pl: "pl-PL",
  fr: "fr-FR",
};

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}
