-- Lead/application status tracking (course leads + job applications get
-- separate status sets since their workflows differ).

create type lead_status as enum (
  'new', 'called', 'interested', 'payment_pending', 'enrolled', 'not_interested'
);

create type application_status as enum (
  'new', 'reviewing', 'interview_scheduled', 'hired', 'rejected'
);

alter table enrollment_leads
  add column if not exists status lead_status not null default 'new';

alter table job_applications
  add column if not exists status application_status not null default 'new';
