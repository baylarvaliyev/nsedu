import { createClient } from "@/lib/supabase/server";
import StaffManager from "@/components/admin/StaffManager";

export default async function AdminStaffPage() {
  const supabase = await createClient();
  const { data: staff } = await supabase
    .from("staff_profiles")
    .select("*")
    .order("created_at", { ascending: true });

  return (
    <div>
      <h1 className="font-display text-2xl text-[#0B1026] mb-6">Staff</h1>
      <StaffManager initialStaff={staff ?? []} />
    </div>
  );
}
