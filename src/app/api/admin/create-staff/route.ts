import { NextResponse } from "next/server";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  // Step 1: verify the caller is logged in and is an Owner, using the
  // normal cookie-authenticated server client (respects RLS).
  const supabase = await createServerClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("staff_profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "owner") {
    return NextResponse.json({ error: "Only Owners can add staff" }, { status: 403 });
  }

  const { email, password, fullName, role } = await request.json();

  if (!email || !password || !role) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (role !== "owner" && role !== "editor") {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  }

  // Step 2: use the service-role client (server-only) to actually create
  // the auth user and the staff_profiles row. This bypasses RLS, which is
  // why the Owner check above is essential — never skip it.
  const serviceClient = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: newUser, error: createError } = await serviceClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (createError || !newUser.user) {
    return NextResponse.json(
      { error: createError?.message || "Failed to create user" },
      { status: 400 }
    );
  }

  const { error: profileError } = await serviceClient.from("staff_profiles").insert({
    id: newUser.user.id,
    email,
    full_name: fullName || null,
    role,
  });

  if (profileError) {
    // Roll back the auth user if the profile insert failed, so we don't
    // leave an orphaned login with no staff_profiles row.
    await serviceClient.auth.admin.deleteUser(newUser.user.id);
    return NextResponse.json({ error: profileError.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
