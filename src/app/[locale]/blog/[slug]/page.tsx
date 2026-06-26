import BlogPostContent from "@/components/BlogPostContent";
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
  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!post) {
    return { title: "Blog — North Star Academy" };
  }

  return {
    title: `${localized(post, "title", locale)} — North Star Academy`,
    description: localized(post, "excerpt", locale) || undefined,
  };
}

export default async function LocaleBlogPostPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  return <BlogPostContent slug={slug} locale={locale} />;
}
