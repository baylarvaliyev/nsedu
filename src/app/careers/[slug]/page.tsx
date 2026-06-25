import JobDetailContent from "@/components/JobDetailContent";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <JobDetailContent slug={slug} locale="en" />;
}
