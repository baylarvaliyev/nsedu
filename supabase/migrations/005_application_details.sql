-- Add more applicant detail fields to job_applications.

alter table job_applications
  add column if not exists birth_year int,
  add column if not exists education_level text,
  add column if not exists years_experience int,
  add column if not exists relevant_experience text;
