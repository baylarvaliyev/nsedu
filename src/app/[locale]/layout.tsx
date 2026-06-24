import { notFound } from "next/navigation";
import { isLocale } from "@/lib/locale";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Only az/ru live under this segment — English is served from the
  // plain root routes (no prefix), so reject anything else, including
  // "en" itself (that would create a duplicate URL for the same content).
  if (!isLocale(locale) || locale === "en") {
    notFound();
  }

  return <>{children}</>;
}
