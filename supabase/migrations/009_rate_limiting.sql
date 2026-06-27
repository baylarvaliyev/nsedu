-- Basic rate limiting (item 5) at the database level, since we don't have
-- a dedicated backend to track request IPs. This guards against repeated/
-- automated submissions to public forms by checking how recently the same
-- contact info was used, not by IP (which we don't have visibility into
-- from client-side Supabase calls).

-- Enrollment leads: block the same phone number from submitting more than
-- once every 5 minutes.
create or replace function check_enrollment_rate_limit()
returns trigger as $$
begin
  if exists (
    select 1 from enrollment_leads
    where phone = new.phone
      and created_at > now() - interval '5 minutes'
  ) then
    raise exception 'Please wait a few minutes before submitting another request.';
  end if;
  return new;
end;
$$ language plpgsql;

create trigger enrollment_rate_limit
  before insert on enrollment_leads
  for each row execute function check_enrollment_rate_limit();

-- Job applications: block the same email from applying more than once
-- every 5 minutes (separate applications to different jobs still allowed
-- after the cooldown).
create or replace function check_application_rate_limit()
returns trigger as $$
begin
  if exists (
    select 1 from job_applications
    where email = new.email
      and created_at > now() - interval '5 minutes'
  ) then
    raise exception 'Please wait a few minutes before submitting another application.';
  end if;
  return new;
end;
$$ language plpgsql;

create trigger application_rate_limit
  before insert on job_applications
  for each row execute function check_application_rate_limit();

-- Email subscribers: the table already has a unique constraint on email,
-- which naturally prevents duplicate signups — no additional trigger needed.

-- Certificate verification: this is a read-only RPC (verify_certificate),
-- not an insert, so a time-based trigger doesn't apply the same way.
-- Limiting repeated lookups would need request-level tracking we don't
-- have; the function's design (exact name + number match required, no
-- partial/listing capability) already prevents bulk enumeration, which is
-- the more important risk for that endpoint.
