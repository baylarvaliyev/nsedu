import { createClient } from "@/lib/supabase/server";
import CourseForm from "@/components/admin/CourseForm";

export default async function NewCoursePage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name_en")
    .order("display_order", { ascending: true });

  return (
    <div>
      <h1 className="font-display text-2xl text-[#0B1026] mb-6">New course</h1>
      <CourseForm categories={categories ?? []} />
    </div>
  );
}
