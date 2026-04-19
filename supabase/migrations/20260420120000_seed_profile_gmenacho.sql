-- Seed singleton public.profile (id = 1) for Gabriel Menacho.
-- Localized fields mirror English into es/pt. Avatar/resume paths left null (upload via admin).
-- GitHub: https://github.com/Gmenacho - email uses GitHub verified noreply for this account; replace in Admin for a direct inbox if you prefer.

update public.profile
set
  display_name = jsonb_build_object(
    'en',
    'Gabriel Menacho',
    'es',
    'Gabriel Menacho',
    'pt',
    'Gabriel Menacho'
  ),
  headline = jsonb_build_object(
    'en',
    'Lead software engineer shipping React, TypeScript, and enterprise front-end platforms.',
    'es',
    'Lead software engineer shipping React, TypeScript, and enterprise front-end platforms.',
    'pt',
    'Lead software engineer shipping React, TypeScript, and enterprise front-end platforms.'
  ),
  role_label = jsonb_build_object(
    'en',
    'Lead Software Engineer',
    'es',
    'Lead Software Engineer',
    'pt',
    'Lead Software Engineer'
  ),
  bio = jsonb_build_object(
    'en',
    $bio$
I lead front-end delivery for large product teams: React and TypeScript applications, shared component libraries, and Storybook-driven design-dev workflows. I care about test-backed quality (Jest, Cypress), SOLID and clean architecture, and CI/CD with GitHub Actions so releases stay fast and predictable.

My recent focus includes enterprise UX at scale, e-commerce surfaces, and AI-adjacent product work such as retrieval-augmented experiences and agentic workflows - always grounded in measurable outcomes for users and the business.
$bio$,
    'es',
    $bio$
I lead front-end delivery for large product teams: React and TypeScript applications, shared component libraries, and Storybook-driven design-dev workflows. I care about test-backed quality (Jest, Cypress), SOLID and clean architecture, and CI/CD with GitHub Actions so releases stay fast and predictable.

My recent focus includes enterprise UX at scale, e-commerce surfaces, and AI-adjacent product work such as retrieval-augmented experiences and agentic workflows - always grounded in measurable outcomes for users and the business.
$bio$,
    'pt',
    $bio$
I lead front-end delivery for large product teams: React and TypeScript applications, shared component libraries, and Storybook-driven design-dev workflows. I care about test-backed quality (Jest, Cypress), SOLID and clean architecture, and CI/CD with GitHub Actions so releases stay fast and predictable.

My recent focus includes enterprise UX at scale, e-commerce surfaces, and AI-adjacent product work such as retrieval-augmented experiences and agentic workflows - always grounded in measurable outcomes for users and the business.
$bio$
  ),
  location = jsonb_build_object(
    'en',
    'Bolivia',
    'es',
    'Bolivia',
    'pt',
    'Bolivia'
  ),
  email = '186786860+Gmenacho@users.noreply.github.com',
  social_github = 'https://github.com/Gmenacho',
  social_linkedin = 'https://www.linkedin.com/in/gmenacho',
  avatar_path = null,
  resume_override_path = null,
  updated_at = now()
where id = 1;
