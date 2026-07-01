import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseComparison from "@/components/CourseComparison";
import PageAscentBackground from "@/components/PageAscentBackground";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Courses — North Star Academy",
  description: "Compare Data Science and Analytics courses side by side — duration, price, syllabus, and who each one is designed for.",
};

export default async function ComparePage() {
  const supabase = await createClient();
  const { data: courses } = await supabase
    .from("courses")
    .select("id, slug, title_en, description_en, long_description_en, who_for_en, syllabus_en, price_amount, original_price_amount, price_currency, duration_weeks, level, cover_image_url")
    .eq("is_published", true)
    .order("display_order", { ascending: true });

  return (
    <>
      <PageAscentBackground />
      <Header locale="en" />
      <main className="relative flex-1 pt-16">
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">
          <div className="mb-12 text-center">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-[#8A93B8] mb-4">
              Compare
            </p>
            <h1 className="font-display text-4xl sm:text-5xl text-[#F5F3EE] mb-4">
              Which course fits<br className="hidden sm:block" /> your situation?
            </h1>
            <p className="font-body text-base text-[#8A93B8] max-w-xl mx-auto">
              Select any two courses and compare them side by side — duration,
              price, syllabus, and who each one is designed for.
            </p>
          </div>
          <CourseComparison courses={courses ?? []} />
        </div>
      </main>
      <Footer locale="en" />
    </>
  );
}
