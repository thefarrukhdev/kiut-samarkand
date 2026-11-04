import type { Locale, TranslationDictionary } from "../types";
import { uz } from "./uz";
import { ru } from "./ru";
import { en } from "./en";

export const dictionaries: Record<Locale, TranslationDictionary> = {
  uz,
  ru,
  en,
};

export function getDictionary(locale: Locale): TranslationDictionary {
  return dictionaries[locale] || dictionaries.uz;
}

export { uz, ru, en };
