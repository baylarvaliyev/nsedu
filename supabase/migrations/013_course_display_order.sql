-- Display order for courses, so the admin can control the order they
-- appear in within their category (categories already have this).

alter table courses
  add column if not exists display_order int not null default 0;
