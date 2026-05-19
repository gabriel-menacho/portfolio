-- Homepage #projects block + header nav link visibility (admin-configurable).
alter table public.profile
  add column if not exists show_home_projects_section boolean not null default true;
