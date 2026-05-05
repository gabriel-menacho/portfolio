alter table public.profile
  add column if not exists phone text not null default '';
