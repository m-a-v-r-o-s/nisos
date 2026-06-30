// Server-only i18n helpers. Imports next/headers, so never import this from a
// "use client" module - client components use the I18nProvider/useI18n instead.
import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from "./config";
import { DICTIONARIES } from "./dictionaries";
import type { Dictionary } from "./dictionaries/en";

export function getLocale(): Locale {
  const value = cookies().get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export function getDictionary(locale: Locale = getLocale()): Dictionary {
  return DICTIONARIES[locale];
}
