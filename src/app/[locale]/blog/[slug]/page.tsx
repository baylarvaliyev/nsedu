import BlogPostContent from "@/components/BlogPostContent";
import type { Locale } from "@/lib/locale";

export default async function LocaleBlogPostPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  return <BlogPostContent slug={slug} locale={locale} />;
}
