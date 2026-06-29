-- Featured flag: lets the owner mark specific courses (e.g. bootcamps)
-- to receive bigger, more prominent placement on /courses and a
-- dedicated section on the homepage.

alter table courses
  add column if not exists is_featured boolean not null default false;
