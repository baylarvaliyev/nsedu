-- North Star Academy (nsedu) — Initial Schema
-- Run this in Supabase SQL Editor

-- ============================================
-- STAFF / ADMIN USERS
-- ============================================
create type staff_role as enum ('owner', 'editor');

create table staff_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role staff_role not null default 'editor',
  created_at timestamptz not null default now()
);

-- ============================================
-- CATEGORIES (Data Science, Languages, Excel, etc.)
-- ============================================
create table categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_az text not null,
  name_en text not null,
  name_ru text not null,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ============================================
-- COURSES
-- ============================================
create table courses (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references categories(id) on delete set null,
  slug text not null unique,

  title_az text not null,
  title_en text not null,
  title_ru text not null,

  description_az text,
  description_en text,
  description_ru text,

  syllabus_az text,
  syllabus_en text,
  syllabus_ru text,

  cover_image_url text,
  price_amount numeric(10,2),
  price_currency text not null default 'AZN',
  start_date date,
  duration_weeks int,
  schedule_text_az text,
  schedule_text_en text,
  schedule_text_ru text,

  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================
-- BLOG POSTS
-- ============================================
create table blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  author_id uuid references staff_profiles(id) on delete set null,

  title_az text not null,
  title_en text not null,
  title_ru text not null,

  excerpt_az text,
  excerpt_en text,
  excerpt_ru text,

  content_az text,
  content_en text,
  content_ru text,

  cover_image_url text,
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================
-- FAQ
-- ============================================
create table faq_items (
  id uuid primary key default gen_random_uuid(),
  question_az text not null,
  question_en text not null,
  question_ru text not null,
  answer_az text not null,
  answer_en text not null,
  answer_ru text not null,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ============================================
-- PRICING COMPARISON
-- ============================================
create table pricing_plans (
  id uuid primary key default gen_random_uuid(),
  name_az text not null,
  name_en text not null,
  name_ru text not null,
  price_amount numeric(10,2),
  price_currency text not null default 'AZN',
  features_az text[],
  features_en text[],
  features_ru text[],
  is_highlighted boolean not null default false,
  display_order int not null default 0
);

-- ============================================
-- CERTIFICATES PAGE CONTENT
-- ============================================
create table certificates_content (
  id uuid primary key default gen_random_uuid(),
  title_az text,
  title_en text,
  title_ru text,
  body_az text,
  body_en text,
  body_ru text,
  sample_image_url text,
  updated_at timestamptz not null default now()
);

-- ============================================
-- ENROLLMENT LEADS (form submissions)
-- ============================================
create table enrollment_leads (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references courses(id) on delete set null,
  full_name text not null,
  phone text not null,
  email text,
  message text,
  created_at timestamptz not null default now()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
alter table staff_profiles enable row level security;
alter table categories enable row level security;
alter table courses enable row level security;
alter table blog_posts enable row level security;
alter table faq_items enable row level security;
alter table pricing_plans enable row level security;
alter table certificates_content enable row level security;
alter table enrollment_leads enable row level security;

-- Helper: check if current user is staff, and their role
create or replace function is_staff()
returns boolean as $$
  select exists (select 1 from staff_profiles where id = auth.uid());
$$ language sql security definer stable;

create or replace function is_owner()
returns boolean as $$
  select exists (select 1 from staff_profiles where id = auth.uid() and role = 'owner');
$$ language sql security definer stable;

-- Public can read published content; staff can read/write everything relevant to their role
create policy "Public can view categories" on categories for select using (true);
create policy "Staff can manage categories" on categories for all using (is_staff());

create policy "Public can view published courses" on courses for select using (is_published or is_staff());
create policy "Staff can manage courses" on courses for all using (is_staff());

create policy "Public can view published blog posts" on blog_posts for select using (is_published or is_staff());
create policy "Staff can manage blog posts" on blog_posts for all using (is_staff());

create policy "Public can view faq" on faq_items for select using (true);
create policy "Only owner manages faq" on faq_items for all using (is_owner());

create policy "Public can view pricing" on pricing_plans for select using (true);
create policy "Only owner manages pricing" on pricing_plans for all using (is_owner());

create policy "Public can view certificates content" on certificates_content for select using (true);
create policy "Only owner manages certificates content" on certificates_content for all using (is_owner());

create policy "Staff can view their own profile" on staff_profiles for select using (auth.uid() = id or is_owner());
create policy "Only owner manages staff" on staff_profiles for all using (is_owner());

create policy "Anyone can submit a lead" on enrollment_leads for insert with check (true);
create policy "Staff can view leads" on enrollment_leads for select using (is_staff());
