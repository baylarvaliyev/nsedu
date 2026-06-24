export const LOCALES = ["en", "az", "ru"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

// Picks the right "_en" / "_az" / "_ru" field from a row, e.g.
// localized(course, "title", "az") -> course.title_az
export function localized<T extends Record<string, unknown>>(
  row: T,
  field: string,
  locale: Locale
): string {
  const key = `${field}_${locale}`;
  const value = row[key];
  return typeof value === "string" ? value : "";
}

// Builds a path prefixed for the given locale. English has no prefix
// (matches AdsOnUs: root = English, /az/ and /ru/ for the others).
export function localizedPath(path: string, locale: Locale): string {
  const cleanPath = path === "/" ? "" : path;
  if (locale === DEFAULT_LOCALE) return cleanPath || "/";
  return `/${locale}${cleanPath}`;
}

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  az: "AZ",
  ru: "RU",
};
