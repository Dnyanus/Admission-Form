-- Run this once in the Supabase SQL Editor for your project.
create table if not exists public.admission_applications (
  id uuid primary key default gen_random_uuid(),
  application_type text not null check (application_type in ('first_year', 'second_year')),
  applicant_name text not null check (char_length(trim(applicant_name)) between 2 and 120),
  email text not null check (char_length(email) <= 254 and email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  phone text not null check (phone ~ '^[6-9][0-9]{9}$'),
  academic_year text not null check (char_length(academic_year) between 7 and 9),
  details jsonb not null default '{}'::jsonb check (jsonb_typeof(details) = 'object' and octet_length(details::text) <= 16000),
  created_at timestamptz not null default now()
);

alter table public.admission_applications enable row level security;
revoke all on public.admission_applications from anon, authenticated;
grant insert on public.admission_applications to anon, authenticated;

drop policy if exists "Public can submit admission applications" on public.admission_applications;
create policy "Public can submit admission applications"
  on public.admission_applications
  for insert
  to anon, authenticated
  with check (
    application_type in ('first_year', 'second_year')
    and char_length(trim(applicant_name)) between 2 and 120
    and char_length(email) <= 254
    and email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'
    and phone ~ '^[6-9][0-9]{9}$'
    and char_length(academic_year) between 7 and 9
    and jsonb_typeof(details) = 'object'
    and octet_length(details::text) <= 16000
  );

