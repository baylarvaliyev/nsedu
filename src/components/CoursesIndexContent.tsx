import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseCatalogClient from "@/components/CourseCatalogClient";
import CoursesPageIntro from "@/components/CoursesPageIntro";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";
import PageAscentBackground from "@/components/PageAscentBackground";
import { createClient } from "@/lib/supabase/server";
import type { Locale } from "@/lib/locale";
import type { Course, Category } from "@/components/CourseCatalog";

export default async function CoursesIndexContent({
  locale = "en" as Locale,
}: {
  locale?: Locale;
}) {
  const supabase = await createClient();

  // All data this page needs in a single parallel batch — previously this
  // ran 3 queries here, then CourseCatalog (a separate async Server
  // Component further down the tree) ran 2 more queries *after* this
  // component had already finished and returned its JSX. Next.js doesn't
  // parallelize across nested async components automatically, so that was
  // two sequential network round-trips to Supabase on every single load of
  // this page. Combining everything into one Promise.all here removes
  // that extra round-trip entirely.
  const [
    { data: faqItems },
    { count: courseCount },
    { count: categoryCount },
    { data: courses },
    { data: categories },
  ] = await Promise.all([
    supabase
      .from("faq_items")
      .select("id, question_az, question_en, question_ru, answer_az, answer_en, answer_ru")
      .order("display_order", { ascending: true }),
    supabase.from("courses").select("id", { count: "exact", head: true }).eq("is_published", true),
    supabase.from("categories").select("id", { count: "exact", head: true }),
    supabase
      .from("courses")
      .select(
        "id, slug, title_az, title_en, title_ru, description_az, description_en, description_ru, cover_image_url, price_amount, original_price_amount, price_currency, start_date, category_id, level, is_featured"
      )
      .eq("is_published", true)
      .order("display_order", { ascending: true }),
    supabase
      .from("categories")
      .select("id, slug, name_az, name_en, name_ru, description_az, description_en, description_ru, cover_image_url")
      .order("display_order", { ascending: true }),
  ]);

  return (
    <>
      <PageAscentBackground />
      <Header locale={locale} />
      <main className="relative flex-1">
        <CoursesPageIntro
          locale={locale}
          courseCount={courseCount ?? 0}
          categoryCount={categoryCount ?? 0}
        />
        <CourseCatalogClient
          courses={(courses ?? []) as Course[]}
          categories={(categories ?? []) as Category[]}
          locale={locale}
        />
        <FaqSection items={faqItems ?? []} locale={locale} />
        <ContactSection locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
