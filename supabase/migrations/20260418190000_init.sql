-- Portfolio schema + RLS + storage buckets

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.profile (
  id int primary key default 1,
  constraint profile_singleton check (id = 1),
  display_name jsonb not null default '{"en":"","es":"","pt":""}'::jsonb,
  headline jsonb not null default '{"en":"","es":"","pt":""}'::jsonb,
  bio jsonb not null default '{"en":"","es":"","pt":""}'::jsonb,
  role_label jsonb not null default '{"en":"","es":"","pt":""}'::jsonb,
  email text not null default '',
  location jsonb not null default '{"en":"","es":"","pt":""}'::jsonb,
  avatar_path text,
  resume_override_path text,
  social_github text,
  social_linkedin text,
  updated_at timestamptz not null default now()
);

create table if not exists public.stack_groups (
  id uuid primary key default gen_random_uuid(),
  title jsonb not null default '{"en":"","es":"","pt":""}'::jsonb,
  slug text not null unique,
  grid_class text not null default 'md:col-span-2',
  variant text not null default 'default',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.technologies (
  id uuid primary key default gen_random_uuid(),
  stack_group_id uuid not null references public.stack_groups (id) on delete cascade,
  name text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  company_logo_path text,
  role_title jsonb not null default '{"en":"","es":"","pt":""}'::jsonb,
  description jsonb not null default '{"en":"","es":"","pt":""}'::jsonb,
  start_date date not null,
  end_date date,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.experience_technology_tags (
  id uuid primary key default gen_random_uuid(),
  experience_id uuid not null references public.experiences (id) on delete cascade,
  label text not null,
  sort_order int not null default 0
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title jsonb not null default '{"en":"","es":"","pt":""}'::jsonb,
  description jsonb not null default '{"en":"","es":"","pt":""}'::jsonb,
  url text,
  repo_url text,
  image_path text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.project_technology_tags (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  label text not null,
  sort_order int not null default 0
);

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

alter table public.profile enable row level security;
alter table public.stack_groups enable row level security;
alter table public.technologies enable row level security;
alter table public.experiences enable row level security;
alter table public.experience_technology_tags enable row level security;
alter table public.projects enable row level security;
alter table public.project_technology_tags enable row level security;

create policy "profile_select_public" on public.profile for select using (true);
create policy "profile_write_auth" on public.profile for all to authenticated using (true) with check (true);

create policy "stack_groups_select_public" on public.stack_groups for select using (true);
create policy "stack_groups_write_auth" on public.stack_groups for all to authenticated using (true) with check (true);

create policy "technologies_select_public" on public.technologies for select using (true);
create policy "technologies_write_auth" on public.technologies for all to authenticated using (true) with check (true);

create policy "experiences_select_public" on public.experiences for select using (true);
create policy "experiences_write_auth" on public.experiences for all to authenticated using (true) with check (true);

create policy "experience_tags_select_public" on public.experience_technology_tags for select using (true);
create policy "experience_tags_write_auth" on public.experience_technology_tags for all to authenticated using (true) with check (true);

create policy "projects_select_public" on public.projects for select using (true);
create policy "projects_write_auth" on public.projects for all to authenticated using (true) with check (true);

create policy "project_tags_select_public" on public.project_technology_tags for select using (true);
create policy "project_tags_write_auth" on public.project_technology_tags for all to authenticated using (true) with check (true);

-- ---------------------------------------------------------------------------
-- Storage buckets
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values
  ('avatars', 'avatars', true),
  ('company-logos', 'company-logos', true),
  ('project-media', 'project-media', true),
  ('resumes', 'resumes', true)
on conflict (id) do nothing;

create policy "storage_public_read"
on storage.objects for select
using (bucket_id in ('avatars', 'company-logos', 'project-media', 'resumes'));

create policy "storage_auth_insert"
on storage.objects for insert to authenticated
with check (bucket_id in ('avatars', 'company-logos', 'project-media', 'resumes'));

create policy "storage_auth_update"
on storage.objects for update to authenticated
using (bucket_id in ('avatars', 'company-logos', 'project-media', 'resumes'))
with check (bucket_id in ('avatars', 'company-logos', 'project-media', 'resumes'));

create policy "storage_auth_delete"
on storage.objects for delete to authenticated
using (bucket_id in ('avatars', 'company-logos', 'project-media', 'resumes'));

-- ---------------------------------------------------------------------------
-- Seed row (empty profile)
-- ---------------------------------------------------------------------------

insert into public.profile (id) values (1)
on conflict (id) do nothing;
