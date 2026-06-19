-- Idempotent seed: Academic Architect (Pydantic AI curriculum engine).
-- Project card links to portfolio case-study page /projects/academic-architect.

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
  'f6666666-6666-4666-8666-666666666666'::uuid,
  '{
    "en": "Academic Architect",
    "es": "Academic Architect",
    "pt": "Academic Architect"
  }'::jsonb,
  '{
    "en": "Pydantic AI curriculum engine that generates validated syllabi with Bloom''s Taxonomy mapping and dual LMS/professor export.",
    "es": "Motor de curriculos con Pydantic AI que genera silabos validados con mapeo de la Taxonomia de Bloom y exportacion dual LMS/profesor.",
    "pt": "Motor de curriculos com Pydantic AI que gera ementas validadas com mapeamento da Taxonomia de Bloom e exportacao dual LMS/professor."
  }'::jsonb,
  '/projects/academic-architect',
  null,
  null,
  3,
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
    'f6666666-6666-4666-8666-666666666601'::uuid,
    'f6666666-6666-4666-8666-666666666666'::uuid,
    'Pydantic AI',
    0
  ),
  (
    'f6666666-6666-4666-8666-666666666602'::uuid,
    'f6666666-6666-4666-8666-666666666666'::uuid,
    'FastAPI',
    1
  ),
  (
    'f6666666-6666-4666-8666-666666666603'::uuid,
    'f6666666-6666-4666-8666-666666666666'::uuid,
    'React',
    2
  ),
  (
    'f6666666-6666-4666-8666-666666666604'::uuid,
    'f6666666-6666-4666-8666-666666666666'::uuid,
    'Vite',
    3
  ),
  (
    'f6666666-6666-4666-8666-666666666605'::uuid,
    'f6666666-6666-4666-8666-666666666666'::uuid,
    'Tailwind CSS',
    4
  )
on conflict (id) do nothing;
