import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import CourseCatalogClient from "./CourseCatalogClient";

export type Course = {
  id: string;
  slug: string;
  title_en: string;
  description_en: string | null;
  cover_image_url: string | null;
  price_amount: number | null;
  price_currency: string;
  start_date: string | null;
  category_id: string | null;
};

export type Category = {
  id: string;
  slug: string;
  name_en: string;
};

export default async function CourseCatalog() {
  const supabase = await createClient();

  const [{ data: courses }, { data: categories }] = await Promise.all([
    supabase
      .from("courses")
      .select(
        "id, slug, title_en, description_en, cover_image_url, price_amount, price_currency, start_date, category_id"
      )
      .eq("is_published", true)
      .order("start_date", { ascending: true }),
    supabase
      .from("categories")
      .select("id, slug, name_en")
      .order("display_order", { ascending: true }),
  ]);

  return (
    <Suspense fallback={null}>
      <CourseCatalogClient
        courses={(courses ?? []) as Course[]}
        categories={(categories ?? []) as Category[]}
      />
    </Suspense>
  );
}
