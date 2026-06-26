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

// Days until a course start date. Returns null for past/missing dates so
// callers can decide whether to show an urgency badge at all — never shows
// a fabricated countdown for something that already started.
export function daysUntil(dateString: string | null): number | null {
  if (!dateString) return null;
  const target = new Date(dateString);
  target.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffMs = target.getTime() - today.getTime();
  const days = Math.round(diffMs / (1000 * 60 * 60 * 24));
  return days >= 0 ? days : null;
}
