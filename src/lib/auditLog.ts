import { createClient } from "@/lib/supabase/client";

type LogParams = {
  action: "create" | "update" | "delete" | "publish" | "unpublish";
  resourceType: string;
  resourceId?: string;
  resourceLabel?: string;
  details?: Record<string, unknown>;
};

// Best-effort audit logging from client components. Failures here never
// block the actual action — losing an audit entry is much less bad than
// blocking a course save because logging hiccuped.
export async function logAdminAction({
  action,
  resourceType,
  resourceId,
  resourceLabel,
  details,
}: LogParams) {
  try {
    const supabase = createClient();
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;
    if (!user) return;

    await supabase.from("audit_log").insert({
      staff_id: user.id,
      staff_email: user.email,
      action,
      resource_type: resourceType,
      resource_id: resourceId || null,
      resource_label: resourceLabel || null,
      details: details || null,
    });
  } catch {
    // Swallow errors — audit logging is supplementary, not critical path.
  }
}
