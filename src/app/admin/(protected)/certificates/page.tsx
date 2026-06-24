import { createClient } from "@/lib/supabase/server";
import CertificateManager from "@/components/admin/CertificateManager";

export default async function AdminCertificatesPage() {
  const supabase = await createClient();

  const [{ data: certificates }, { data: courses }] = await Promise.all([
    supabase
      .from("certificates")
      .select("*")
      .order("created_at", { ascending: false }),
    supabase.from("courses").select("id, title_en").order("title_en"),
  ]);

  return (
    <div>
      <h1 className="font-display text-2xl text-[#0B1026] mb-6">Certificates</h1>
      <CertificateManager
        initialCertificates={certificates ?? []}
        courses={courses ?? []}
      />
    </div>
  );
}
