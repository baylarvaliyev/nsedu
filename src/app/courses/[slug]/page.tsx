import CourseDetailContent from "@/components/CourseDetailContent";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <CourseDetailContent slug={slug} locale="en" />;
}
