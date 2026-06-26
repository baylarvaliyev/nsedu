-- Email capture for visitors who aren't ready to apply yet
-- (exit-intent popup, newsletter-style signup).

create table email_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text, -- e.g. "exit_intent_popup", future: "footer_signup" etc.
  created_at timestamptz not null default now()
);

alter table email_subscribers enable row level security;

create policy "Anyone can subscribe" on email_subscribers
  for insert with check (true);

create policy "Staff can view subscribers" on email_subscribers
  for select using (is_staff());
