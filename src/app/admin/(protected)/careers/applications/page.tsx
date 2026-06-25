import { createClient } from "@/lib/supabase/server";

export default async function AdminApplicationsPage() {
  const supabase = await createClient();
  const { data: applications } = await supabase
    .from("job_applications")
    .select("*")
    .order("created_at", { ascending: false });

  const list = applications ?? [];

  return (
    <div>
      <h1 className="font-display text-2xl text-[#0B1026] mb-6">Applications</h1>

      {list.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#ccc] py-16 text-center">
          <p className="font-body text-sm text-[#888]">No applications yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 max-w-3xl">
          {list.map((app) => (
            <div key={app.id} className="bg-white rounded-xl border border-[#e5e3dc] p-5">
              <div className="flex items-center justify-between mb-2">
                <p className="font-display text-base text-[#0B1026]">{app.full_name}</p>
                <p className="font-body text-xs text-[#888]">
                  {new Date(app.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <p className="font-body text-sm text-[#555] mb-1">
                Applying for: <span className="font-medium text-[#0B1026]">{app.job_title_snapshot || "—"}</span>
              </p>
              <p className="font-body text-sm text-[#555] mb-1">{app.email}{app.phone ? ` · ${app.phone}` : ""}</p>
              <p className="font-body text-sm text-[#777] mb-1">
                {app.birth_year ? `Born ${app.birth_year}` : null}
                {app.education_level ? ` · ${app.education_level}` : null}
                {app.years_experience != null ? ` · ${app.years_experience} yrs experience` : null}
              </p>
              {app.relevant_experience && (
                <p className="font-body text-sm text-[#777] mt-2 whitespace-pre-line">
                  <span className="font-medium text-[#0B1026]">Relevant experience: </span>
                  {app.relevant_experience}
                </p>
              )}
              {app.cover_message && (
                <p className="font-body text-sm text-[#777] mt-3 whitespace-pre-line border-t border-[#f0eee8] pt-3">
                  {app.cover_message}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
