-- Idempotent seed: LegisFlow (legal-tech SaaS).
-- Project card links to portfolio case-study page /projects/legisflow.

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
  'e5555555-5555-4555-8555-555555555555'::uuid,
  '{
    "en": "LegisFlow",
    "es": "LegisFlow",
    "pt": "LegisFlow"
  }'::jsonb,
  '{
    "en": "Legal-tech SaaS with marketing site, firm portal, AI assistant (RAG), and workflow automation.",
    "es": "SaaS legal-tech con sitio de marketing, portal para bufetes, asistente IA (RAG) y automatizacion de flujos.",
    "pt": "SaaS legal-tech com site de marketing, portal para escritorios, assistente IA (RAG) e automacao de fluxos."
  }'::jsonb,
  '/projects/legisflow',
  'https://github.com/gabriel-menacho/legisflow',
  null,
  2,
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
    'e5555555-5555-4555-8555-555555555501'::uuid,
    'e5555555-5555-4555-8555-555555555555'::uuid,
    'Next.js',
    0
  ),
  (
    'e5555555-5555-4555-8555-555555555502'::uuid,
    'e5555555-5555-4555-8555-555555555555'::uuid,
    'FastAPI',
    1
  ),
  (
    'e5555555-5555-4555-8555-555555555503'::uuid,
    'e5555555-5555-4555-8555-555555555555'::uuid,
    'PostgreSQL',
    2
  ),
  (
    'e5555555-5555-4555-8555-555555555504'::uuid,
    'e5555555-5555-4555-8555-555555555555'::uuid,
    'Docker',
    3
  ),
  (
    'e5555555-5555-4555-8555-555555555505'::uuid,
    'e5555555-5555-4555-8555-555555555555'::uuid,
    'AI / RAG',
    4
  )
on conflict (id) do nothing;
