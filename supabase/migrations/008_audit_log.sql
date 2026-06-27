-- Audit log for staff actions. Tracks who changed what, when, on which
-- record, so multi-staff accountability is possible (item 4).

create table audit_log (
  id uuid primary key default gen_random_uuid(),
  staff_id uuid references staff_profiles(id) on delete set null,
  staff_email text, -- snapshot, survives staff deletion
  action text not null, -- e.g. "create", "update", "delete", "publish"
  resource_type text not null, -- e.g. "course", "blog_post", "job_posting"
  resource_id uuid,
  resource_label text, -- human-readable snapshot, e.g. course title
  details jsonb,
  created_at timestamptz not null default now()
);

alter table audit_log enable row level security;

create policy "Staff can view audit log" on audit_log
  for select using (is_staff());

create policy "Staff can write audit log" on audit_log
  for insert with check (is_staff());

-- No update/delete policies — audit entries are append-only by design.
