-- Spare Hand Students experience + reorder timeline; Tu sello project copy and tags.
-- Idempotent: experience insert on conflict do nothing; sort_order set via CASE; tags deduped.

-- ---------------------------------------------------------------------------
-- experiences: Spare Hand Students
-- ---------------------------------------------------------------------------

insert into public.experiences (
  id,
  company_name,
  company_logo_path,
  role_title,
  description,
  start_date,
  end_date,
  sort_order
)
values (
  'b1111111-1111-4111-8111-000000000009'::uuid,
  'Spare Hand Students',
  null,
  jsonb_build_object(
    'en',
    'Lead Front-End Engineer',
    'es',
    'Lead Front-End Engineer',
    'pt',
    'Lead Front-End Engineer'
  ),
  jsonb_build_object(
    'en',
    '- Led React + TypeScript component library adopted across 6 applications, eliminating UI inconsistencies and accelerating feature delivery by 40%, shortening time-to-market and improving user experience consistency.'
      || chr(10)
      || '- Architected front-end application and GitHub Actions CI/CD pipelines, reducing deployment time from days to hours, enabling faster iterations and lowering operational costs.'
      || chr(10)
      || '- Built comprehensive Jest test suite with high coverage while enforcing SOLID principles, boosting code maintainability, reducing defects, and cutting long-term technical debt for the front-end team.'
      || chr(10)
      || '- Directed Agile/Scrum as front-end lead, delivering 4 major enterprise releases in 4 months with high quality, accelerating the product roadmap while protecting brand reputation.'
      || chr(10)
      || '- Owned Storybook documentation for 35+ components, streamlining design-developer collaboration and reducing alignment time, ensuring consistent, on-brand UX across applications.',
    'es',
    '- Led React + TypeScript component library adopted across 6 applications, eliminating UI inconsistencies and accelerating feature delivery by 40%, shortening time-to-market and improving user experience consistency.'
      || chr(10)
      || '- Architected front-end application and GitHub Actions CI/CD pipelines, reducing deployment time from days to hours, enabling faster iterations and lowering operational costs.'
      || chr(10)
      || '- Built comprehensive Jest test suite with high coverage while enforcing SOLID principles, boosting code maintainability, reducing defects, and cutting long-term technical debt for the front-end team.'
      || chr(10)
      || '- Directed Agile/Scrum as front-end lead, delivering 4 major enterprise releases in 4 months with high quality, accelerating the product roadmap while protecting brand reputation.'
      || chr(10)
      || '- Owned Storybook documentation for 35+ components, streamlining design-developer collaboration and reducing alignment time, ensuring consistent, on-brand UX across applications.',
    'pt',
    '- Led React + TypeScript component library adopted across 6 applications, eliminating UI inconsistencies and accelerating feature delivery by 40%, shortening time-to-market and improving user experience consistency.'
      || chr(10)
      || '- Architected front-end application and GitHub Actions CI/CD pipelines, reducing deployment time from days to hours, enabling faster iterations and lowering operational costs.'
      || chr(10)
      || '- Built comprehensive Jest test suite with high coverage while enforcing SOLID principles, boosting code maintainability, reducing defects, and cutting long-term technical debt for the front-end team.'
      || chr(10)
      || '- Directed Agile/Scrum as front-end lead, delivering 4 major enterprise releases in 4 months with high quality, accelerating the product roadmap while protecting brand reputation.'
      || chr(10)
      || '- Owned Storybook documentation for 35+ components, streamlining design-developer collaboration and reducing alignment time, ensuring consistent, on-brand UX across applications.'
  ),
  '2025-06-01',
  '2026-02-28',
  1
)
on conflict (id) do nothing;

-- Most recent first: BlueYonder 0, Spare Hand 1, then historical order.
update public.experiences
set
  sort_order = case id
    when 'b1111111-1111-4111-8111-000000000001'::uuid then 0
    when 'b1111111-1111-4111-8111-000000000009'::uuid then 1
    when 'b1111111-1111-4111-8111-000000000002'::uuid then 2
    when 'b1111111-1111-4111-8111-000000000003'::uuid then 3
    when 'b1111111-1111-4111-8111-000000000004'::uuid then 4
    when 'b1111111-1111-4111-8111-000000000005'::uuid then 5
    when 'b1111111-1111-4111-8111-000000000006'::uuid then 6
    when 'b1111111-1111-4111-8111-000000000007'::uuid then 7
    when 'b1111111-1111-4111-8111-000000000008'::uuid then 8
  end
where
  id in (
    'b1111111-1111-4111-8111-000000000001'::uuid,
    'b1111111-1111-4111-8111-000000000009'::uuid,
    'b1111111-1111-4111-8111-000000000002'::uuid,
    'b1111111-1111-4111-8111-000000000003'::uuid,
    'b1111111-1111-4111-8111-000000000004'::uuid,
    'b1111111-1111-4111-8111-000000000005'::uuid,
    'b1111111-1111-4111-8111-000000000006'::uuid,
    'b1111111-1111-4111-8111-000000000007'::uuid,
    'b1111111-1111-4111-8111-000000000008'::uuid
  );

-- ---------------------------------------------------------------------------
-- experience_technology_tags (Spare Hand Students)
-- ---------------------------------------------------------------------------

insert into public.experience_technology_tags (id, experience_id, label, sort_order)
select gen_random_uuid(), 'b1111111-1111-4111-8111-000000000009'::uuid, v.label, v.sort_order
from (
  values
    ('React 19', 0),
    ('Next.js', 1),
    ('TypeScript', 2),
    ('JavaScript (ES6+)', 3),
    ('HTML5', 4),
    ('CSS3', 5),
    ('Figma', 6),
    ('SASS', 7),
    ('Storybook', 8),
    ('Jest', 9),
    ('GitHub', 10),
    ('GitHub Actions', 11),
    ('SQL', 12),
    ('Microfrontends', 13),
    ('Git', 14),
    ('Agile', 15),
    ('Scrum', 16)
) as v(label, sort_order)
where exists (
  select 1 from public.experiences e where e.id = 'b1111111-1111-4111-8111-000000000009'::uuid
)
and not exists (
  select 1
  from public.experience_technology_tags t
  where
    t.experience_id = 'b1111111-1111-4111-8111-000000000009'::uuid
    and t.label = v.label
);

-- ---------------------------------------------------------------------------
-- projects: Tu sello (from tu-sello-next README + package.json)
-- ---------------------------------------------------------------------------

update public.projects
set
  title = jsonb_build_object(
    'en',
    'Tu sello',
    'es',
    'Tu sello',
    'pt',
    'Tu sello'
  ),
  description = jsonb_build_object(
    'en',
    'E-commerce experience for digital stamps: product catalog, shopping cart, and WhatsApp-assisted ordering. Firebase Authentication (email, Google, and Facebook), Material UI with Next.js App Router and SSR, API routes, and SEO-oriented pages. Stack includes Next.js 15, React 18, TypeScript, Tailwind CSS, NextAuth.js, Embla Carousel, and Firebase; designed for deployment on Vercel or Firebase Hosting.',
    'es',
    'Experiencia de comercio electrónico para sellos digitales: catálogo, carrito y pedidos asistidos por WhatsApp. Autenticación con Firebase (correo, Google y Facebook), Material UI con Next.js App Router y SSR, rutas API y páginas orientadas al SEO. Stack: Next.js 15, React 18, TypeScript, Tailwind CSS, NextAuth.js, Embla Carousel y Firebase; pensado para desplegar en Vercel o Firebase Hosting.',
    'pt',
    'E-commerce para selos digitais: catálogo, carrinho e pedidos com apoio via WhatsApp. Firebase Auth (e-mail, Google e Facebook), Material UI com Next.js App Router e SSR, rotas de API e páginas focadas em SEO. Stack: Next.js 15, React 18, TypeScript, Tailwind CSS, NextAuth.js, Embla Carousel e Firebase; preparado para Vercel ou Firebase Hosting.'
  )
where
  id = 'b2222222-2222-4222-8222-222222222222'::uuid;

-- ---------------------------------------------------------------------------
-- project_technology_tags (Tu sello)
-- ---------------------------------------------------------------------------

insert into public.project_technology_tags (id, project_id, label, sort_order)
select gen_random_uuid(), 'b2222222-2222-4222-8222-222222222222'::uuid, v.label, v.sort_order
from (
  values
    ('Next.js', 0),
    ('React', 1),
    ('TypeScript', 2),
    ('Tailwind CSS', 3),
    ('Material UI', 4),
    ('Firebase', 5),
    ('NextAuth.js', 6),
    ('Embla Carousel', 7),
    ('react-share', 8)
) as v(label, sort_order)
where exists (
  select 1
  from public.projects p
  where p.id = 'b2222222-2222-4222-8222-222222222222'::uuid
)
and not exists (
  select 1
  from public.project_technology_tags t
  where
    t.project_id = 'b2222222-2222-4222-8222-222222222222'::uuid
    and t.label = v.label
);
