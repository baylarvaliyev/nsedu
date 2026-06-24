import CourseDetailContent from "@/components/CourseDetailContent";
import type { Locale } from "@/lib/locale";

export default async function LocaleCourseDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  return <CourseDetailContent slug={slug} locale={locale} />;
}
