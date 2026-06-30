import type { Locale } from "../config";
import { en, type Dictionary } from "./en";
import { el } from "./el";

export const DICTIONARIES: Record<Locale, Dictionary> = { en, el };
export type { Dictionary };
