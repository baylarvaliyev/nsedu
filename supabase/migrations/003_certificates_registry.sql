-- Replace the simple "certificates_content" static page with a real
-- certificate registry + public verification lookup.
--
-- Privacy note: the certificates table itself is NOT publicly readable —
-- that would let anyone enumerate every graduate's name. Instead, public
-- verification goes through a function that checks one specific
-- name + certificate number pair and returns only a minimal result.

create table certificates (
  id uuid primary key default gen_random_uuid(),
  certificate_number text not null unique,
  first_name text not null,
  last_name text not null,
  course_id uuid references courses(id) on delete set null,
  course_title_snapshot text, -- preserved even if the course is later edited/deleted
  issue_date date not null default current_date,
  is_valid boolean not null default true, -- allows revoking without deleting history
  notes text, -- internal admin notes, never shown publicly
  created_at timestamptz not null default now()
);

alter table certificates enable row level security;

-- Staff (Owner or Editor) can fully manage certificates.
create policy "Staff can manage certificates" on certificates
  for all using (is_staff());

-- No public select policy on the table itself — verification only
-- happens through the function below.

-- Public verification function. Anyone can call this (it's exposed via
-- the anon role through Supabase's RPC mechanism), but it only checks
-- one specific certificate_number + name combination and returns a small,
-- non-enumerable result — never a list, never unrelated records.
create or replace function verify_certificate(
  p_certificate_number text,
  p_first_name text,
  p_last_name text
)
returns table (
  is_valid boolean,
  first_name text,
  last_name text,
  course_title text,
  issue_date date
)
security definer
language sql
as $$
  select
    c.is_valid,
    c.first_name,
    c.last_name,
    c.course_title_snapshot,
    c.issue_date
  from certificates c
  where c.certificate_number = trim(p_certificate_number)
    and lower(c.first_name) = lower(trim(p_first_name))
    and lower(c.last_name) = lower(trim(p_last_name))
  limit 1;
$$;

-- Allow the public (anon) role to call this specific function.
grant execute on function verify_certificate(text, text, text) to anon;
