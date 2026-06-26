import CourseDetailContent from "@/components/CourseDetailContent";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: course } = await supabase
    .from("courses")
    .select("title_en, description_en")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!course) {
    return { title: "Course — North Star Academy" };
  }

  return {
    title: `${course.title_en} — North Star Academy`,
    description: course.description_en || `Learn ${course.title_en} at North Star Academy in Baku.`,
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <CourseDetailContent slug={slug} locale="en" />;
}
