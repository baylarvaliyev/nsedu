import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Locale } from "@/lib/locale";
import { localized } from "@/lib/locale";

const BLOG_POST_EYEBROW = { en: "Blog", az: "Bloq", ru: "Блог" } as const;

export default async function BlogPostContent({
  slug,
  locale = "en" as Locale,
}: {
  slug: string;
  locale?: Locale;
}) {
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!post) {
    notFound();
  }

  const dateLocale = locale === "ru" ? "ru-RU" : locale === "az" ? "az-AZ" : "en-GB";

  return (
    <>
      <Header locale={locale} />
      <main className="flex-1 bg-[#0b1026] pt-16">
        <article className="max-w-2xl mx-auto px-6 py-16">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-[#8A93B8] mb-4">
            {BLOG_POST_EYEBROW[locale]}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl text-[#F5F3EE] mb-4">
            {localized(post, "title", locale)}
          </h1>
          {post.published_at && (
            <p className="font-body text-xs text-[#8A93B8]/60 mb-8">
              {new Date(post.published_at).toLocaleDateString(dateLocale, {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
          {localized(post, "content", locale) && (
            <div className="font-body text-base text-[#8A93B8] leading-relaxed whitespace-pre-line">
              {localized(post, "content", locale)}
            </div>
          )}
        </article>
      </main>
      <Footer locale={locale} />
    </>
  );
}
