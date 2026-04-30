-- Idempotent seed: AutoNexus (Expo React Native).
-- Project card opens Appetize (free tier does not allow iframe embed on portfolio).

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
  'd4444444-4444-4444-8444-444444444444'::uuid,
  '{
    "en": "AutoNexus",
    "es": "AutoNexus",
    "pt": "AutoNexus"
  }'::jsonb,
  '{
    "en": "Expo + React Native marketplace app for buying, renting, and selling vehicles.",
    "es": "Aplicacion Expo + React Native para comprar, alquilar y vender vehiculos.",
    "pt": "Aplicativo Expo + React Native para compra, aluguel e venda de veiculos."
  }'::jsonb,
  'https://appetize.io/app/b_gjfas3mp4lxawzvyend337tsaq',
  null,
  null,
  1,
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
    'd4444444-4444-4444-8444-444444444401'::uuid,
    'd4444444-4444-4444-8444-444444444444'::uuid,
    'Expo',
    0
  ),
  (
    'd4444444-4444-4444-8444-444444444402'::uuid,
    'd4444444-4444-4444-8444-444444444444'::uuid,
    'React Native',
    1
  ),
  (
    'd4444444-4444-4444-8444-444444444403'::uuid,
    'd4444444-4444-4444-8444-444444444444'::uuid,
    'AWS',
    2
  ),
  (
    'd4444444-4444-4444-8444-444444444404'::uuid,
    'd4444444-4444-4444-8444-444444444444'::uuid,
    'Cognito',
    3
  )
on conflict (id) do nothing;
