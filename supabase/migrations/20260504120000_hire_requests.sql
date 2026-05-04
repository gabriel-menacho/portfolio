-- Recruiter "hire me" submissions (public insert, authenticated read/delete)

create table if not exists public.hire_requests (
  id uuid primary key default gen_random_uuid(),
  recruiter_email text not null,
  recruiter_name text,
  company text,
  job_title text not null,
  employment_type text,
  job_location text,
  is_remote boolean not null default false,
  salary_range text,
  job_description text not null,
  message text,
  locale text,
  user_agent text,
  created_at timestamptz not null default now(),
  constraint hire_requests_email_format check (
    recruiter_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  ),
  constraint hire_requests_job_desc_length check (
    char_length(job_description) between 1 and 4000
  )
);

alter table public.hire_requests enable row level security;

create policy "hire_requests_insert_public" on public.hire_requests
  for insert to anon, authenticated
  with check (true);

create policy "hire_requests_select_auth" on public.hire_requests
  for select to authenticated
  using (true);

create policy "hire_requests_delete_auth" on public.hire_requests
  for delete to authenticated
  using (true);
