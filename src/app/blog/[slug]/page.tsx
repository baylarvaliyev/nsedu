import BlogPostContent from "@/components/BlogPostContent";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("title_en, excerpt_en")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!post) {
    return { title: "Blog — North Star Academy" };
  }

  return {
    title: `${post.title_en} — North Star Academy Blog`,
    description: post.excerpt_en || undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BlogPostContent slug={slug} locale="en" />;
}
