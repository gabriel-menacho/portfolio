-- Idempotent seed: this codebase as a featured project (sort_order -1 lists first ascending).
-- Set production URL and repo URL in Admin → Projects after deploy if desired.

insert into public.projects (
  id,
  title,
  description,
  url,
  repo_url,
  image_path,
  sort_order
)
values (
  'a1111111-1111-4111-8111-111111111111'::uuid,
  '{
    "en": "This portfolio site",
    "es": "Este sitio portfolio",
    "pt": "Este site portfolio"
  }'::jsonb,
  '{
    "en": "Personal portfolio with Next.js, Supabase, i18n (EN/ES/PT), admin CRUD, ATS resume PDF, and light/dark theming.",
    "es": "Portfolio personal con Next.js, Supabase, i18n (EN/ES/PT), admin CRUD, CV en PDF ATS y tema claro/oscuro.",
    "pt": "Portfolio pessoal com Next.js, Supabase, i18n (EN/ES/PT), admin CRUD, PDF de currículo ATS e tema claro/escuro."
  }'::jsonb,
  null,
  null,
  null,
  -1
)
on conflict (id) do nothing;

insert into public.project_technology_tags (id, project_id, label, sort_order)
select gen_random_uuid(), 'a1111111-1111-4111-8111-111111111111'::uuid, v.label, v.sort_order
from (
  values
    ('Next.js', 0),
    ('TypeScript', 1),
    ('Supabase', 2),
    ('Tailwind CSS', 3)
) as v(label, sort_order)
where exists (
  select 1
  from public.projects p
  where p.id = 'a1111111-1111-4111-8111-111111111111'::uuid
)
and not exists (
  select 1
  from public.project_technology_tags t
  where
    t.project_id = 'a1111111-1111-4111-8111-111111111111'::uuid
    and t.label = v.label
);
