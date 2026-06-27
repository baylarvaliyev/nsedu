import { createClient } from "@/lib/supabase/server";
import LeadStatusSelect from "@/components/admin/LeadStatusSelect";

export default async function AdminLeadsPage() {
  const supabase = await createClient();
  const { data: leads } = await supabase
    .from("enrollment_leads")
    .select("*, courses(title_en)")
    .order("created_at", { ascending: false });

  const list = leads ?? [];

  return (
    <div>
      <h1 className="font-display text-2xl text-[#0B1026] mb-6">
        Course Leads ({list.length})
      </h1>

      {list.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#ccc] py-16 text-center">
          <p className="font-body text-sm text-[#888]">
            No enrollment requests yet.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#e5e3dc] overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#f7f6f3] border-b border-[#e5e3dc]">
              <tr>
                <th className="font-body text-xs uppercase tracking-wide text-[#888] px-5 py-3">Name</th>
                <th className="font-body text-xs uppercase tracking-wide text-[#888] px-5 py-3">Course</th>
                <th className="font-body text-xs uppercase tracking-wide text-[#888] px-5 py-3">Contact</th>
                <th className="font-body text-xs uppercase tracking-wide text-[#888] px-5 py-3">Status</th>
                <th className="font-body text-xs uppercase tracking-wide text-[#888] px-5 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {list.map((lead) => (
                <tr key={lead.id} className="border-b border-[#f0eee8] last:border-0">
                  <td className="px-5 py-3 font-body text-sm text-[#0B1026]">
                    {lead.full_name}
                  </td>
                  <td className="px-5 py-3 font-body text-sm text-[#555]">
                    {lead.courses?.title_en || "—"}
                  </td>
                  <td className="px-5 py-3 font-body text-sm text-[#555]">
                    {lead.phone}
                    {lead.email ? ` · ${lead.email}` : ""}
                  </td>
                  <td className="px-5 py-3">
                    <LeadStatusSelect leadId={lead.id} currentStatus={lead.status} />
                  </td>
                  <td className="px-5 py-3 font-body text-sm text-[#888]">
                    {new Date(lead.created_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
