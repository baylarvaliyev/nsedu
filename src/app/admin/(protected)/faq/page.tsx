import { createClient } from "@/lib/supabase/server";
import FaqManager from "@/components/admin/FaqManager";

export default async function AdminFaqPage() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("faq_items")
    .select("*")
    .order("display_order", { ascending: true });

  return (
    <div>
      <h1 className="font-display text-2xl text-[#0B1026] mb-6">FAQ</h1>
      <FaqManager initialItems={items ?? []} />
    </div>
  );
}
