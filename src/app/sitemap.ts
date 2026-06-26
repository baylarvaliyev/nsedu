import { createClient } from "@/lib/supabase/server";
import type { MetadataRoute } from "next";

const BASE_URL = "https://nsedu.co";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  const [{ data: courses }, { data: posts }, { data: jobs }] = await Promise.all([
    supabase.from("courses").select("slug, created_at").eq("is_published", true),
    supabase.from("blog_posts").select("slug, published_at").eq("is_published", true),
    supabase.from("job_postings").select("slug, created_at").eq("is_published", true),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/courses`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/careers`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${BASE_URL}/certificates`, changeFrequency: "monthly", priority: 0.3 },
  ];

  const coursePages: MetadataRoute.Sitemap = (courses ?? []).flatMap((course) => [
    { url: `${BASE_URL}/courses/${course.slug}`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/az/courses/${course.slug}`, changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${BASE_URL}/ru/courses/${course.slug}`, changeFrequency: "weekly" as const, priority: 0.6 },
  ]);

  const blogPages: MetadataRoute.Sitemap = (posts ?? []).map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.published_at ?? undefined,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const jobPages: MetadataRoute.Sitemap = (jobs ?? []).map((job) => ({
    url: `${BASE_URL}/careers/${job.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...coursePages, ...blogPages, ...jobPages];
}
