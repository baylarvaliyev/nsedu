import JobDetailContent from "@/components/JobDetailContent";
import type { Locale } from "@/lib/locale";

export default async function LocaleJobDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  return <JobDetailContent slug={slug} locale={locale} />;
}
