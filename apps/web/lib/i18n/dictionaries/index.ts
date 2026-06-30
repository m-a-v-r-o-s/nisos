import type { Locale } from "../config";
import { en, type Dictionary } from "./en";
import { el } from "./el";
import { de } from "./de";
import { it } from "./it";
import { pl } from "./pl";
import { fr } from "./fr";

export const DICTIONARIES: Record<Locale, Dictionary> = { en, el, de, it, pl, fr };
export type { Dictionary };
