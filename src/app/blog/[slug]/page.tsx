import BlogPostContent from "@/components/BlogPostContent";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BlogPostContent slug={slug} locale="en" />;
}
