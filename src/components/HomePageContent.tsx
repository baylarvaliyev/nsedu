import HomeIntro from "@/components/HomeIntro";
import FeaturedPrograms from "@/components/FeaturedPrograms";
import { createClient } from "@/lib/supabase/server";
import type { Locale } from "@/lib/locale";

export default async function HomePageContent({
  locale = "en" as Locale,
}: {
  locale?: Locale;
}) {
  const supabase = await createClient();
  const { data: featuredCourses } = await supabase
    .from("courses")
    .select(
      "id, slug, title_az, title_en, title_ru, description_az, description_en, description_ru, cover_image_url, price_amount, original_price_amount, price_currency"
    )
    .eq("is_published", true)
    .eq("is_featured", true)
    .order("display_order", { ascending: true });

  return (
    <main className="flex-1">
      <HomeIntro locale={locale} />
      <FeaturedPrograms courses={featuredCourses ?? []} locale={locale} />
    </main>
  );
}
