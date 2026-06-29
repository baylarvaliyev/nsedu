import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus } from "lucide-react";
import CoursesList from "@/components/admin/CoursesList";

export default async function AdminCoursesPage() {
  const supabase = await createClient();
  const { data: courses } = await supabase
    .from("courses")
    .select("id, slug, title_en, price_amount, price_currency, start_date, is_published, display_order")
    .order("display_order", { ascending: true });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="font-display text-2xl text-[#0B1026]">Courses</h1>
        <Link
          href="/admin/courses/new"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0B1026] text-white font-body text-sm font-medium px-4 py-2 hover:bg-[#1a2046] transition-colors w-fit"
        >
          <Plus size={16} />
          New course
        </Link>
      </div>

      <CoursesList initialCourses={courses ?? []} />
    </div>
  );
}
