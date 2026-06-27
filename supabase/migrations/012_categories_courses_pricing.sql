-- Category descriptions, course duplication support fields, level
-- indicator, and discount pricing.

alter table categories
  add column if not exists description_az text,
  add column if not exists description_en text,
  add column if not exists description_ru text;

alter table courses
  add column if not exists level text, -- e.g. "Beginner", "Intermediate", "Advanced"
  add column if not exists original_price_amount numeric(10,2); -- if set and higher than price_amount, price_amount is treated as the discounted price
