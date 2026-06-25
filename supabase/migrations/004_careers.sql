-- Careers: job postings + applications, following the same pattern as
-- courses/certificates (staff-managed content + public-submitted records).

create table job_postings (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_az text not null,
  title_en text not null,
  title_ru text not null,
  description_az text,
  description_en text,
  description_ru text,
  location text,
  employment_type text, -- e.g. "Full-time", "Part-time", "Contract"
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create table job_applications (
  id uuid primary key default gen_random_uuid(),
  job_posting_id uuid references job_postings(id) on delete set null,
  job_title_snapshot text, -- preserved even if the posting is later edited/removed
  full_name text not null,
  email text not null,
  phone text,
  cover_message text,
  created_at timestamptz not null default now()
);

alter table job_postings enable row level security;
alter table job_applications enable row level security;

create policy "Public can view published job postings" on job_postings
  for select using (is_published or is_staff());
create policy "Staff can manage job postings" on job_postings
  for all using (is_staff());

create policy "Anyone can submit a job application" on job_applications
  for insert with check (true);
create policy "Staff can view job applications" on job_applications
  for select using (is_staff());
