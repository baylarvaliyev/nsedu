"use client";

import { usePathname } from "next/navigation";
import { LOCALES, LOCALE_LABELS, type Locale, DEFAULT_LOCALE } from "@/lib/locale";

function stripLocalePrefix(path: string): string {
  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) continue;
    if (path === `/${locale}` || path.startsWith(`/${locale}/`)) {
      return path.slice(locale.length + 1) || "/";
    }
  }
  return path;
}

export default function LanguageSwitcher({
  currentLocale,
}: {
  currentLocale: Locale;
}) {
  const pathname = usePathname();
  const basePath = stripLocalePrefix(pathname);

  return (
    <div className="flex items-center gap-1 rounded-full border border-[#8A93B8]/20 p-0.5">
      {LOCALES.map((locale) => {
        const href =
          locale === DEFAULT_LOCALE ? basePath : `/${locale}${basePath === "/" ? "" : basePath}`;
        const isActive = locale === currentLocale;
        return (
          <a
            key={locale}
            href={href}
            className={`font-body text-xs font-medium rounded-full px-2.5 py-1 transition-colors ${
              isActive
                ? "bg-[#F2C14E] text-[#0B1026]"
                : "text-[#8A93B8] hover:text-[#F5F3EE]"
            }`}
          >
            {LOCALE_LABELS[locale]}
          </a>
        );
      })}
    </div>
  );
}
