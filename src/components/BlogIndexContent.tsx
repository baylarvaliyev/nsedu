import { createClient } from "@/lib/supabase/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Locale } from "@/lib/locale";
import { localized, localizedPath } from "@/lib/locale";

const BLOG_STRINGS = {
  en: { eyebrow: "Blog", heading: "Notes from North Star.", empty: "Nothing here yet — check back soon." },
  az: { eyebrow: "Bloq", heading: "North Star-dan qeydlər.", empty: "Hələ heç nə yoxdur — tezliklə yoxla." },
  ru: { eyebrow: "Блог", heading: "Заметки North Star.", empty: "Здесь пока пусто — загляните позже." },
} as const;

export default async function BlogIndexContent({
  locale = "en" as Locale,
}: {
  locale?: Locale;
}) {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, slug, title_az, title_en, title_ru, excerpt_az, excerpt_en, excerpt_ru, published_at")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  const list = posts ?? [];
  const t = BLOG_STRINGS[locale];
  const dateLocale = locale === "ru" ? "ru-RU" : locale === "az" ? "az-AZ" : "en-GB";

  return (
    <>
      <Header locale={locale} />
      <main className="flex-1 bg-[#0b1026] pt-16">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-[#8A93B8] mb-4">
            {t.eyebrow}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl text-[#F5F3EE] mb-12">
            {t.heading}
          </h1>

          {list.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#8A93B8]/30 py-16 text-center">
              <p className="font-body text-[#8A93B8]">{t.empty}</p>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {list.map((post) => {
                const title = localized(post, "title", locale);
                const excerpt = localized(post, "excerpt", locale);
                return (
                  <Link
                    key={post.id}
                    href={localizedPath(`/blog/${post.slug}`, locale)}
                    className="group block border-b border-[#8A93B8]/10 pb-8 last:border-0"
                  >
                    <h2 className="font-display text-2xl text-[#F5F3EE] group-hover:text-[#F2C14E] transition-colors mb-2">
                      {title}
                    </h2>
                    {excerpt && (
                      <p className="font-body text-sm text-[#8A93B8] leading-relaxed">
                        {excerpt}
                      </p>
                    )}
                    {post.published_at && (
                      <p className="font-body text-xs text-[#8A93B8]/60 mt-3">
                        {new Date(post.published_at).toLocaleDateString(dateLocale, {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
