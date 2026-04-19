-- Idempotent seed: tu-sello (GitHub). sort_order 0 lists after portfolio (-1).
-- Refine title/description in Admin if the public README differs.

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
  'b2222222-2222-4222-8222-222222222222'::uuid,
  '{
    "en": "Tu sello",
    "es": "Tu sello",
    "pt": "Tu sello"
  }'::jsonb,
  '{
    "en": "Project for digital stamps and related workflows. Source and details live in the GitHub repository.",
    "es": "Proyecto de sellos digitales y flujos relacionados. Código y detalles en el repositorio de GitHub.",
    "pt": "Projeto de selos digitais e fluxos relacionados. Código e detalhes no repositório do GitHub."
  }'::jsonb,
  null,
  'https://github.com/gabriel-menacho/tu-sello',
  null,
  0
)
on conflict (id) do nothing;
