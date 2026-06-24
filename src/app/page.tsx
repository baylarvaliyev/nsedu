import HomeIntro from "@/components/HomeIntro";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseCatalog from "@/components/CourseCatalog";
import FaqSection from "@/components/FaqSection";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: faqItems } = await supabase
    .from("faq_items")
    .select("id, question_en, answer_en")
    .order("display_order", { ascending: true });

  return (
    <>
      <Header />
      <main className="flex-1">
        <HomeIntro />
        <CourseCatalog />
        <FaqSection items={faqItems ?? []} />
      </main>
      <Footer />
    </>
  );
}
