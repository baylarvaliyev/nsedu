-- Storage bucket for course/category cover images.
-- Public read (so images display on the site), staff-only write.

insert into storage.buckets (id, name, public)
values ('course-images', 'course-images', true)
on conflict (id) do nothing;

create policy "Public can view course images" on storage.objects
  for select using (bucket_id = 'course-images');

create policy "Staff can upload course images" on storage.objects
  for insert with check (bucket_id = 'course-images' and is_staff());

create policy "Staff can update course images" on storage.objects
  for update using (bucket_id = 'course-images' and is_staff());

create policy "Staff can delete course images" on storage.objects
  for delete using (bucket_id = 'course-images' and is_staff());

-- Add a category cover image column (courses already have cover_image_url).
alter table categories
  add column if not exists cover_image_url text;
