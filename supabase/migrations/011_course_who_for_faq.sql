-- Per-course "Who this is for" field and course-specific FAQ.

alter table courses
  add column if not exists who_for_az text,
  add column if not exists who_for_en text,
  add column if not exists who_for_ru text;

create table course_faq_items (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses(id) on delete cascade,
  question_az text not null,
  question_en text not null,
  question_ru text not null,
  answer_az text not null,
  answer_en text not null,
  answer_ru text not null,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table course_faq_items enable row level security;

create policy "Public can view course faq" on course_faq_items
  for select using (true);

create policy "Staff can manage course faq" on course_faq_items
  for all using (is_staff());
