import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import CourseCatalogClient from "./CourseCatalogClient";
import type { Locale } from "@/lib/locale";

export type Course = {
  id: string;
  slug: string;
  title_az: string;
  title_en: string;
  title_ru: string;
  description_az: string | null;
  description_en: string | null;
  description_ru: string | null;
  cover_image_url: string | null;
  price_amount: number | null;
  price_currency: string;
  start_date: string | null;
  category_id: string | null;
};

export type Category = {
  id: string;
  slug: string;
  name_az: string;
  name_en: string;
  name_ru: string;
};

export default async function CourseCatalog({
  locale = "en" as Locale,
}: {
  locale?: Locale;
}) {
  const supabase = await createClient();

  const [{ data: courses }, { data: categories }] = await Promise.all([
    supabase
      .from("courses")
      .select(
        "id, slug, title_az, title_en, title_ru, description_az, description_en, description_ru, cover_image_url, price_amount, price_currency, start_date, category_id"
      )
      .eq("is_published", true)
      .order("start_date", { ascending: true }),
    supabase
      .from("categories")
      .select("id, slug, name_az, name_en, name_ru")
      .order("display_order", { ascending: true }),
  ]);

  return (
    <Suspense fallback={null}>
      <CourseCatalogClient
        courses={(courses ?? []) as Course[]}
        categories={(categories ?? []) as Category[]}
        locale={locale}
      />
    </Suspense>
  );
}
