-- Refresh Spare Hand Students experience copy and technology tags.
-- Idempotent: UPDATE description; DELETE + INSERT tags for fixed experience id.

-- ---------------------------------------------------------------------------
-- descriptions (en/es/pt — same English body as other resume seeds)
-- ---------------------------------------------------------------------------

update public.experiences
set
  description = jsonb_build_object(
    'en',
    '- Led front-end architecture for the Spare Hand Students platform using React + TypeScript, building a scalable, reusable UI foundation that accelerated feature delivery and elevated consistency, accessibility, and overall user experience.'
      || chr(10)
      || '- Introduced AI-assisted development workflows (code generation, review acceleration, and test-case drafting) to streamline engineering throughput, shorten implementation cycles, and improve release confidence.'
      || chr(10)
      || '- Architected a robust state-management layer with Redux Toolkit, RTK Query, and XState for complex multi-step journeys, reducing state-related defects and improving reliability in critical student and customer flows.'
      || chr(10)
      || '- Drove quality engineering with Vitest, Testing Library, MSW, and Cypress E2E automation, strengthening regression protection and enabling faster, safer iterations.'
      || chr(10)
      || '- Owned design-system execution with Material UI, Tailwind CSS, and Storybook, tightening design-engineering collaboration and reducing time from Figma handoff to production-ready UI.'
      || chr(10)
      || '- Directed Agile/Scrum delivery as Frontend Lead, translating roadmap goals into high-quality incremental releases while enforcing coding standards.',
    'es',
    '- Led front-end architecture for the Spare Hand Students platform using React + TypeScript, building a scalable, reusable UI foundation that accelerated feature delivery and elevated consistency, accessibility, and overall user experience.'
      || chr(10)
      || '- Introduced AI-assisted development workflows (code generation, review acceleration, and test-case drafting) to streamline engineering throughput, shorten implementation cycles, and improve release confidence.'
      || chr(10)
      || '- Architected a robust state-management layer with Redux Toolkit, RTK Query, and XState for complex multi-step journeys, reducing state-related defects and improving reliability in critical student and customer flows.'
      || chr(10)
      || '- Drove quality engineering with Vitest, Testing Library, MSW, and Cypress E2E automation, strengthening regression protection and enabling faster, safer iterations.'
      || chr(10)
      || '- Owned design-system execution with Material UI, Tailwind CSS, and Storybook, tightening design-engineering collaboration and reducing time from Figma handoff to production-ready UI.'
      || chr(10)
      || '- Directed Agile/Scrum delivery as Frontend Lead, translating roadmap goals into high-quality incremental releases while enforcing coding standards.',
    'pt',
    '- Led front-end architecture for the Spare Hand Students platform using React + TypeScript, building a scalable, reusable UI foundation that accelerated feature delivery and elevated consistency, accessibility, and overall user experience.'
      || chr(10)
      || '- Introduced AI-assisted development workflows (code generation, review acceleration, and test-case drafting) to streamline engineering throughput, shorten implementation cycles, and improve release confidence.'
      || chr(10)
      || '- Architected a robust state-management layer with Redux Toolkit, RTK Query, and XState for complex multi-step journeys, reducing state-related defects and improving reliability in critical student and customer flows.'
      || chr(10)
      || '- Drove quality engineering with Vitest, Testing Library, MSW, and Cypress E2E automation, strengthening regression protection and enabling faster, safer iterations.'
      || chr(10)
      || '- Owned design-system execution with Material UI, Tailwind CSS, and Storybook, tightening design-engineering collaboration and reducing time from Figma handoff to production-ready UI.'
      || chr(10)
      || '- Directed Agile/Scrum delivery as Frontend Lead, translating roadmap goals into high-quality incremental releases while enforcing coding standards.'
  )
where
  id = 'b1111111-1111-4111-8111-000000000009'::uuid;

-- ---------------------------------------------------------------------------
-- experience_technology_tags: replace set for Spare Hand Students
-- ---------------------------------------------------------------------------

delete from public.experience_technology_tags
where
  experience_id = 'b1111111-1111-4111-8111-000000000009'::uuid;

insert into public.experience_technology_tags (id, experience_id, label, sort_order)
select gen_random_uuid(), 'b1111111-1111-4111-8111-000000000009'::uuid, v.label, v.sort_order
from (
  values
    ('React', 0),
    ('TypeScript', 1),
    ('JavaScript (ES6+)', 2),
    ('Vite', 3),
    ('Redux Toolkit', 4),
    ('RTK Query', 5),
    ('XState', 6),
    ('React Router', 7),
    ('Material UI', 8),
    ('Tailwind CSS', 9),
    ('Storybook', 10),
    ('Vitest', 11),
    ('Testing Library', 12),
    ('Cypress', 13),
    ('MSW', 14),
    ('i18next', 15),
    ('ESLint', 16),
    ('Prettier', 17),
    ('Husky', 18),
    ('Git', 19),
    ('GitHub', 20),
    ('GitHub Actions', 21),
    ('AI-assisted development', 22),
    ('Agile', 23),
    ('Scrum', 24)
) as v(label, sort_order)
where exists (
  select 1 from public.experiences e where e.id = 'b1111111-1111-4111-8111-000000000009'::uuid
);
