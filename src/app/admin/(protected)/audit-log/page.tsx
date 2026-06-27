import { createClient } from "@/lib/supabase/server";

const ACTION_COLORS: Record<string, string> = {
  create: "bg-green-100 text-green-700",
  update: "bg-blue-100 text-blue-700",
  delete: "bg-red-100 text-red-700",
  publish: "bg-[#F2C14E]/20 text-[#0B1026]",
  unpublish: "bg-amber-100 text-amber-700",
};

export default async function AdminAuditLogPage() {
  const supabase = await createClient();
  const { data: entries } = await supabase
    .from("audit_log")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  const list = entries ?? [];

  return (
    <div>
      <h1 className="font-display text-2xl text-[#0B1026] mb-2">Audit Log</h1>
      <p className="font-body text-sm text-[#888] mb-6">
        A record of staff actions across courses, blog posts, and job postings. Most recent 200 entries.
      </p>

      {list.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#ccc] py-16 text-center">
          <p className="font-body text-sm text-[#888]">No activity recorded yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#e5e3dc] overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#f7f6f3] border-b border-[#e5e3dc]">
              <tr>
                <th className="font-body text-xs uppercase tracking-wide text-[#888] px-5 py-3">When</th>
                <th className="font-body text-xs uppercase tracking-wide text-[#888] px-5 py-3">Who</th>
                <th className="font-body text-xs uppercase tracking-wide text-[#888] px-5 py-3">Action</th>
                <th className="font-body text-xs uppercase tracking-wide text-[#888] px-5 py-3">What</th>
              </tr>
            </thead>
            <tbody>
              {list.map((entry) => (
                <tr key={entry.id} className="border-b border-[#f0eee8] last:border-0">
                  <td className="px-5 py-3 font-body text-xs text-[#888] whitespace-nowrap">
                    {new Date(entry.created_at).toLocaleString("en-GB", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-5 py-3 font-body text-sm text-[#0B1026]">
                    {entry.staff_email || "—"}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`font-body text-xs rounded-full px-2.5 py-1 ${
                        ACTION_COLORS[entry.action] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {entry.action}
                    </span>
                  </td>
                  <td className="px-5 py-3 font-body text-sm text-[#555]">
                    <span className="text-[#888]">{entry.resource_type}</span>
                    {entry.resource_label ? `: ${entry.resource_label}` : ""}
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
