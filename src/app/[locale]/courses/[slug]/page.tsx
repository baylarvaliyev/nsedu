import CourseDetailContent from "@/components/CourseDetailContent";
import { createClient } from "@/lib/supabase/server";
import { localized } from "@/lib/locale";
import type { Locale } from "@/lib/locale";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const supabase = await createClient();
  const { data: course } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!course) {
    return { title: "Course — North Star Academy" };
  }

  const title = localized(course, "title", locale);
  const description = localized(course, "description", locale);

  return {
    title: `${title} — North Star Academy`,
    description: description || `${title} — North Star Academy, Baku.`,
  };
}

export default async function LocaleCourseDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  return <CourseDetailContent slug={slug} locale={locale} />;
}
