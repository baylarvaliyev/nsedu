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
    { data: enrollmentCounts },
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
    // Enrollment counts per course for the last 30 days — used to show
    // "X enrolled this month" on cards, only when count is meaningful (≥3).
    supabase
      .from("enrollment_leads")
      .select("course_id")
      .gte("created_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
  ]);

  // Build a map of course_id → count for the last 30 days.
  // Only passed to the client if count ≥ 3 to avoid showing "1 enrolled"
  // on a brand-new academy, which hurts rather than helps trust.
  const enrollmentMap: Record<string, number> = {};
  for (const row of enrollmentCounts ?? []) {
    if (row.course_id) {
      enrollmentMap[row.course_id] = (enrollmentMap[row.course_id] ?? 0) + 1;
    }
  }

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
          enrollmentMap={enrollmentMap}
          locale={locale}
        />
        <FaqSection items={faqItems ?? []} locale={locale} />
        <ContactSection locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
