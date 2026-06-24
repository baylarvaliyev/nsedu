-- Add long-form description fields, separate from the short card blurb
-- (description_az/en/ru), so the course detail page can show more than
-- what fits on a catalog card.

alter table courses
  add column if not exists long_description_az text,
  add column if not exists long_description_en text,
  add column if not exists long_description_ru text;
