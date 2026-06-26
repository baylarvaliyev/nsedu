import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseCatalog from "@/components/CourseCatalog";
import CoursesPageIntro from "@/components/CoursesPageIntro";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";
import { createClient } from "@/lib/supabase/server";
import type { Locale } from "@/lib/locale";

export default async function CoursesIndexContent({
  locale = "en" as Locale,
}: {
  locale?: Locale;
}) {
  const supabase = await createClient();
  const [{ data: faqItems }, { count: courseCount }, { count: categoryCount }] = await Promise.all([
    supabase
      .from("faq_items")
      .select("id, question_az, question_en, question_ru, answer_az, answer_en, answer_ru")
      .order("display_order", { ascending: true }),
    supabase.from("courses").select("id", { count: "exact", head: true }).eq("is_published", true),
    supabase.from("categories").select("id", { count: "exact", head: true }),
  ]);

  return (
    <>
      <Header locale={locale} />
      <main className="flex-1">
        <CoursesPageIntro
          locale={locale}
          courseCount={courseCount ?? 0}
          categoryCount={categoryCount ?? 0}
        />
        <CourseCatalog locale={locale} />
        <FaqSection items={faqItems ?? []} locale={locale} />
        <ContactSection locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
