-- Public visibility: landing page + PDF resume use show_on_site; admin lists all rows.

alter table public.experiences
  add column if not exists show_on_site boolean not null default true;

alter table public.projects
  add column if not exists show_on_site boolean not null default true;
