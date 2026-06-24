import { createClient } from "@/lib/supabase/server";
import CategoryManager from "@/components/admin/CategoryManager";

export default async function AdminCategoriesPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("display_order", { ascending: true });

  return (
    <div>
      <h1 className="font-display text-2xl text-[#0B1026] mb-6">Categories</h1>
      <CategoryManager initialCategories={categories ?? []} />
    </div>
  );
}
