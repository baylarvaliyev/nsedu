import { createClient } from "@/lib/supabase/server";
import CourseForm from "@/components/admin/CourseForm";
import { notFound } from "next/navigation";

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: categories }, { data: course }] = await Promise.all([
    supabase.from("categories").select("id, name_en").order("display_order"),
    supabase.from("courses").select("*").eq("id", id).single(),
  ]);

  if (!course) {
    notFound();
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-[#0B1026] mb-6">
        Edit course
      </h1>
      <CourseForm
        categories={categories ?? []}
        initial={{
          id: course.id,
          slug: course.slug,
          category_id: course.category_id,
          title_az: course.title_az ?? "",
          title_en: course.title_en ?? "",
          title_ru: course.title_ru ?? "",
          description_az: course.description_az ?? "",
          description_en: course.description_en ?? "",
          description_ru: course.description_ru ?? "",
          long_description_az: course.long_description_az ?? "",
          long_description_en: course.long_description_en ?? "",
          long_description_ru: course.long_description_ru ?? "",
          price_amount: course.price_amount?.toString() ?? "",
          price_currency: course.price_currency ?? "AZN",
          start_date: course.start_date ?? "",
          duration_weeks: course.duration_weeks?.toString() ?? "",
          is_published: course.is_published ?? false,
          cover_image_url: course.cover_image_url ?? null,
        }}
      />
    </div>
  );
}
