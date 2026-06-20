-- Idempotent seed: Sous-Chef AI (Pydantic AI meal prep assistant).
-- Project card links to portfolio case-study page /projects/sous-chef.

insert into public.projects (
  id,
  title,
  description,
  url,
  repo_url,
  image_path,
  sort_order,
  show_on_site
)
values (
  'c7777777-7777-4777-8777-777777777777'::uuid,
  '{
    "en": "Sous-Chef AI",
    "es": "Sous-Chef AI",
    "pt": "Sous-Chef AI"
  }'::jsonb,
  '{
    "en": "Pydantic AI meal prep assistant that models recipes as DAGs and generates parallelized Service Plans with mise en place gating.",
    "es": "Asistente de preparacion de comidas con Pydantic AI que modela recetas como DAGs y genera planes de servicio paralelizados con control de mise en place.",
    "pt": "Assistente de preparo de refeicoes com Pydantic AI que modela receitas como DAGs e gera planos de servico paralelizados com controle de mise en place."
  }'::jsonb,
  '/projects/sous-chef',
  null,
  null,
  4,
  true
)
on conflict (id) do nothing;

insert into public.project_technology_tags (
  id,
  project_id,
  label,
  sort_order
)
values
  (
    'c7777777-7777-4777-8777-777777777701'::uuid,
    'c7777777-7777-4777-8777-777777777777'::uuid,
    'Pydantic AI',
    0
  ),
  (
    'c7777777-7777-4777-8777-777777777702'::uuid,
    'c7777777-7777-4777-8777-777777777777'::uuid,
    'FastAPI',
    1
  ),
  (
    'c7777777-7777-4777-8777-777777777703'::uuid,
    'c7777777-7777-4777-8777-777777777777'::uuid,
    'Next.js',
    2
  ),
  (
    'c7777777-7777-4777-8777-777777777704'::uuid,
    'c7777777-7777-4777-8777-777777777777'::uuid,
    'Supabase',
    3
  ),
  (
    'c7777777-7777-4777-8777-777777777705'::uuid,
    'c7777777-7777-4777-8777-777777777777'::uuid,
    'Tailwind CSS',
    4
  )
on conflict (id) do nothing;
