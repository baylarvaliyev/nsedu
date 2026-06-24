import HomeIntro from "@/components/HomeIntro";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseCatalog from "@/components/CourseCatalog";
import FaqSection from "@/components/FaqSection";
import { createClient } from "@/lib/supabase/server";
import type { Locale } from "@/lib/locale";

export default async function HomePageContent({
  locale = "en" as Locale,
}: {
  locale?: Locale;
}) {
  const supabase = await createClient();
  const { data: faqItems } = await supabase
    .from("faq_items")
    .select("id, question_az, question_en, question_ru, answer_az, answer_en, answer_ru")
    .order("display_order", { ascending: true });

  return (
    <>
      <Header locale={locale} />
      <main className="flex-1">
        <HomeIntro locale={locale} />
        <CourseCatalog locale={locale} />
        <FaqSection items={faqItems ?? []} locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
