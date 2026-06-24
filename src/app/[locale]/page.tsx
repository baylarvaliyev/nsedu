import HomePageContent from "@/components/HomePageContent";
import type { Locale } from "@/lib/locale";

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <HomePageContent locale={locale} />;
}
