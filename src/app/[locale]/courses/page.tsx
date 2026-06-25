import CoursesIndexContent from "@/components/CoursesIndexContent";
import type { Locale } from "@/lib/locale";

export default async function LocaleCoursesIndexPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <CoursesIndexContent locale={locale} />;
}
