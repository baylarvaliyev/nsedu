import CareersIndexContent from "@/components/CareersIndexContent";
import type { Locale } from "@/lib/locale";

export default async function LocaleCareersIndexPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <CareersIndexContent locale={locale} />;
}
