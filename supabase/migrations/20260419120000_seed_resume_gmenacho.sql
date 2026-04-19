-- Seed work experience + stack/skills from LinkedIn resume (designs/gmenacho-linkedin-resume.pdf).
-- Idempotent: fixed UUID primary keys + deduped experience tags.

-- ---------------------------------------------------------------------------
-- stack_groups (fixed ids: c2222222-2222-4222-8222-00000000000n)
-- ---------------------------------------------------------------------------

insert into public.stack_groups (id, title, slug, grid_class, variant, sort_order)
values
  (
    'c2222222-2222-4222-8222-000000000001'::uuid,
    '{"en":"Product & AI","es":"Product & AI","pt":"Product & AI"}'::jsonb,
    'gmenacho-top-skills',
    'md:col-span-2',
    'default',
    0
  ),
  (
    'c2222222-2222-4222-8222-000000000002'::uuid,
    '{"en":"Languages","es":"Idiomas","pt":"Idiomas"}'::jsonb,
    'gmenacho-languages',
    'md:col-span-2',
    'default',
    1
  ),
  (
    'c2222222-2222-4222-8222-000000000003'::uuid,
    '{"en":"Frontend","es":"Frontend","pt":"Frontend"}'::jsonb,
    'gmenacho-frontend',
    'md:col-span-2',
    'default',
    2
  ),
  (
    'c2222222-2222-4222-8222-000000000004'::uuid,
    '{"en":"Backend & APIs","es":"Backend y APIs","pt":"Backend e APIs"}'::jsonb,
    'gmenacho-backend',
    'md:col-span-2',
    'default',
    3
  ),
  (
    'c2222222-2222-4222-8222-000000000005'::uuid,
    '{"en":"Data","es":"Datos","pt":"Dados"}'::jsonb,
    'gmenacho-data',
    'md:col-span-2',
    'default',
    4
  ),
  (
    'c2222222-2222-4222-8222-000000000006'::uuid,
    '{"en":"Cloud, quality & delivery","es":"Nube, calidad y entrega","pt":"Nuvem, qualidade e entrega"}'::jsonb,
    'gmenacho-cloud-quality',
    'md:col-span-2',
    'default',
    5
  )
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- technologies (stack_group_id -> stack groups above)
-- ---------------------------------------------------------------------------

insert into public.technologies (id, stack_group_id, name, sort_order)
values
  -- Top skills
  ('d3333333-3333-4333-8333-000000000001'::uuid, 'c2222222-2222-4222-8222-000000000001'::uuid, 'E-Commerce', 0),
  ('d3333333-3333-4333-8333-000000000002'::uuid, 'c2222222-2222-4222-8222-000000000001'::uuid, 'Retrieval-Augmented Generation (RAG)', 1),
  ('d3333333-3333-4333-8333-000000000003'::uuid, 'c2222222-2222-4222-8222-000000000001'::uuid, 'Agentic Workflows', 2),
  -- Human languages
  ('d3333333-3333-4333-8333-000000000004'::uuid, 'c2222222-2222-4222-8222-000000000002'::uuid, 'Spanish (Native or Bilingual)', 0),
  ('d3333333-3333-4333-8333-000000000005'::uuid, 'c2222222-2222-4222-8222-000000000002'::uuid, 'English (Native or Bilingual)', 1),
  ('d3333333-3333-4333-8333-000000000006'::uuid, 'c2222222-2222-4222-8222-000000000002'::uuid, 'Portuguese (Elementary)', 2),
  -- Frontend
  ('d3333333-3333-4333-8333-000000000007'::uuid, 'c2222222-2222-4222-8222-000000000003'::uuid, 'React', 0),
  ('d3333333-3333-4333-8333-000000000008'::uuid, 'c2222222-2222-4222-8222-000000000003'::uuid, 'Next.js', 1),
  ('d3333333-3333-4333-8333-000000000009'::uuid, 'c2222222-2222-4222-8222-000000000003'::uuid, 'TypeScript', 2),
  ('d3333333-3333-4333-8333-000000000010'::uuid, 'c2222222-2222-4222-8222-000000000003'::uuid, 'JavaScript', 3),
  ('d3333333-3333-4333-8333-000000000011'::uuid, 'c2222222-2222-4222-8222-000000000003'::uuid, 'Redux / RTK Query', 4),
  ('d3333333-3333-4333-8333-000000000012'::uuid, 'c2222222-2222-4222-8222-000000000003'::uuid, 'SASS', 5),
  ('d3333333-3333-4333-8333-000000000013'::uuid, 'c2222222-2222-4222-8222-000000000003'::uuid, 'Storybook', 6),
  ('d3333333-3333-4333-8333-000000000014'::uuid, 'c2222222-2222-4222-8222-000000000003'::uuid, 'Material UI', 7),
  ('d3333333-3333-4333-8333-000000000015'::uuid, 'c2222222-2222-4222-8222-000000000003'::uuid, 'HTML5 / CSS3', 8),
  ('d3333333-3333-4333-8333-000000000016'::uuid, 'c2222222-2222-4222-8222-000000000003'::uuid, 'Microfrontends', 9),
  -- Backend
  ('d3333333-3333-4333-8333-000000000017'::uuid, 'c2222222-2222-4222-8222-000000000004'::uuid, 'Node.js', 0),
  ('d3333333-3333-4333-8333-000000000018'::uuid, 'c2222222-2222-4222-8222-000000000004'::uuid, 'NestJS', 1),
  ('d3333333-3333-4333-8333-000000000019'::uuid, 'c2222222-2222-4222-8222-000000000004'::uuid, 'GraphQL', 2),
  ('d3333333-3333-4333-8333-000000000020'::uuid, 'c2222222-2222-4222-8222-000000000004'::uuid, 'Go', 3),
  -- Data
  ('d3333333-3333-4333-8333-000000000021'::uuid, 'c2222222-2222-4222-8222-000000000005'::uuid, 'PostgreSQL', 0),
  ('d3333333-3333-4333-8333-000000000022'::uuid, 'c2222222-2222-4222-8222-000000000005'::uuid, 'MongoDB', 1),
  ('d3333333-3333-4333-8333-000000000023'::uuid, 'c2222222-2222-4222-8222-000000000005'::uuid, 'DynamoDB', 2),
  -- Cloud & quality
  ('d3333333-3333-4333-8333-000000000024'::uuid, 'c2222222-2222-4222-8222-000000000006'::uuid, 'AWS', 0),
  ('d3333333-3333-4333-8333-000000000025'::uuid, 'c2222222-2222-4222-8222-000000000006'::uuid, 'Terraform', 1),
  ('d3333333-3333-4333-8333-000000000026'::uuid, 'c2222222-2222-4222-8222-000000000006'::uuid, 'Serverless', 2),
  ('d3333333-3333-4333-8333-000000000027'::uuid, 'c2222222-2222-4222-8222-000000000006'::uuid, 'Docker', 3),
  ('d3333333-3333-4333-8333-000000000028'::uuid, 'c2222222-2222-4222-8222-000000000006'::uuid, 'GitHub Actions', 4),
  ('d3333333-3333-4333-8333-000000000029'::uuid, 'c2222222-2222-4222-8222-000000000006'::uuid, 'Jest', 5),
  ('d3333333-3333-4333-8333-000000000030'::uuid, 'c2222222-2222-4222-8222-000000000006'::uuid, 'Cypress', 6)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- experiences (most recent = lowest sort_order)
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
values
  (
    'b1111111-1111-4111-8111-000000000001'::uuid,
    'BlueYonder',
    null,
    jsonb_build_object(
      'en',
      'Lead Software Engineer (via Torc)',
      'es',
      'Lead Software Engineer (via Torc)',
      'pt',
      'Lead Software Engineer (via Torc)'
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
    '2025-03-01',
    null,
    0
  ),
  (
    'b1111111-1111-4111-8111-000000000002'::uuid,
    'Syndio',
    null,
    jsonb_build_object(
      'en',
      'Senior Front-End Developer (via Turing)',
      'es',
      'Senior Front-End Developer (via Turing)',
      'pt',
      'Senior Front-End Developer (via Turing)'
    ),
    jsonb_build_object(
      'en',
      '- Drove Agile/Scrum ceremonies and Jira/Confluence workflows as front-end lead, enabling seamless cross-team collaboration and on-time delivery of multiple product initiatives.'
        || chr(10)
        || '- Built responsive React + TypeScript applications using SASS and RTK Query, improving user experience by 45% and delivering smoother, faster interfaces for end users.'
        || chr(10)
        || '- Designed and automated GitHub Actions + Codefresh CI/CD pipelines, reducing deployment time by 50% — enabling faster iterations and higher release frequency.'
        || chr(10)
        || '- Implemented Jest unit tests and Cypress E2E testing, achieving 88% test coverage and significantly reducing production bugs while improving overall application stability.'
        || chr(10)
        || '- Applied clean code, SOLID principles, and modern software engineering practices across the frontend architecture, building scalable and maintainable systems that supported long-term team velocity.',
      'es',
      '- Drove Agile/Scrum ceremonies and Jira/Confluence workflows as front-end lead, enabling seamless cross-team collaboration and on-time delivery of multiple product initiatives.'
        || chr(10)
        || '- Built responsive React + TypeScript applications using SASS and RTK Query, improving user experience by 45% and delivering smoother, faster interfaces for end users.'
        || chr(10)
        || '- Designed and automated GitHub Actions + Codefresh CI/CD pipelines, reducing deployment time by 50% — enabling faster iterations and higher release frequency.'
        || chr(10)
        || '- Implemented Jest unit tests and Cypress E2E testing, achieving 88% test coverage and significantly reducing production bugs while improving overall application stability.'
        || chr(10)
        || '- Applied clean code, SOLID principles, and modern software engineering practices across the frontend architecture, building scalable and maintainable systems that supported long-term team velocity.',
      'pt',
      '- Drove Agile/Scrum ceremonies and Jira/Confluence workflows as front-end lead, enabling seamless cross-team collaboration and on-time delivery of multiple product initiatives.'
        || chr(10)
        || '- Built responsive React + TypeScript applications using SASS and RTK Query, improving user experience by 45% and delivering smoother, faster interfaces for end users.'
        || chr(10)
        || '- Designed and automated GitHub Actions + Codefresh CI/CD pipelines, reducing deployment time by 50% — enabling faster iterations and higher release frequency.'
        || chr(10)
        || '- Implemented Jest unit tests and Cypress E2E testing, achieving 88% test coverage and significantly reducing production bugs while improving overall application stability.'
        || chr(10)
        || '- Applied clean code, SOLID principles, and modern software engineering practices across the frontend architecture, building scalable and maintainable systems that supported long-term team velocity.'
    ),
    '2023-11-01',
    '2025-01-31',
    1
  ),
  (
    'b1111111-1111-4111-8111-000000000003'::uuid,
    'Catapult Labs',
    null,
    jsonb_build_object(
      'en',
      'Senior Full-Stack Developer (via Encora Inc.)',
      'es',
      'Senior Full-Stack Developer (via Encora Inc.)',
      'pt',
      'Senior Full-Stack Developer (via Encora Inc.)'
    ),
    jsonb_build_object(
      'en',
      '- Increased team productivity by 30% by streamlining retrospective sessions and continuous improvement workflows, accelerating delivery cadence and fostering a culture of rapid iteration.'
        || chr(10)
        || '- Modernized legacy AngularJS codebases to Atlaskit while enforcing clean code and SOLID principles, significantly improving maintainability and reducing technical debt.'
        || chr(10)
        || '- Delivered full-stack features and well-tested React components for complex enterprise client applications, enabling faster value delivery to key customers.'
        || chr(10)
        || '- Led development of React + TypeScript + GraphQL applications with CSS Modules, Node.js, and MongoDB integrations, building scalable and performant enterprise solutions.'
        || chr(10)
        || '- Designed and built custom Jira + Confluence automation tools, transforming Scrum retrospectives and driving more effective team reflection and process improvements.',
      'es',
      '- Increased team productivity by 30% by streamlining retrospective sessions and continuous improvement workflows, accelerating delivery cadence and fostering a culture of rapid iteration.'
        || chr(10)
        || '- Modernized legacy AngularJS codebases to Atlaskit while enforcing clean code and SOLID principles, significantly improving maintainability and reducing technical debt.'
        || chr(10)
        || '- Delivered full-stack features and well-tested React components for complex enterprise client applications, enabling faster value delivery to key customers.'
        || chr(10)
        || '- Led development of React + TypeScript + GraphQL applications with CSS Modules, Node.js, and MongoDB integrations, building scalable and performant enterprise solutions.'
        || chr(10)
        || '- Designed and built custom Jira + Confluence automation tools, transforming Scrum retrospectives and driving more effective team reflection and process improvements.',
      'pt',
      '- Increased team productivity by 30% by streamlining retrospective sessions and continuous improvement workflows, accelerating delivery cadence and fostering a culture of rapid iteration.'
        || chr(10)
        || '- Modernized legacy AngularJS codebases to Atlaskit while enforcing clean code and SOLID principles, significantly improving maintainability and reducing technical debt.'
        || chr(10)
        || '- Delivered full-stack features and well-tested React components for complex enterprise client applications, enabling faster value delivery to key customers.'
        || chr(10)
        || '- Led development of React + TypeScript + GraphQL applications with CSS Modules, Node.js, and MongoDB integrations, building scalable and performant enterprise solutions.'
        || chr(10)
        || '- Designed and built custom Jira + Confluence automation tools, transforming Scrum retrospectives and driving more effective team reflection and process improvements.'
    ),
    '2022-10-01',
    '2023-10-31',
    2
  ),
  (
    'b1111111-1111-4111-8111-000000000004'::uuid,
    'OnFrontiers',
    null,
    jsonb_build_object(
      'en',
      'Senior Full-Stack Engineer (via Jobsity)',
      'es',
      'Senior Full-Stack Engineer (via Jobsity)',
      'pt',
      'Senior Full-Stack Engineer (via Jobsity)'
    ),
    jsonb_build_object(
      'en',
      '- Spearheaded full-stack project from inception to production (0 to 1) using React, Go Lang, and GraphQL, delivering a scalable enterprise solution on time and in production.'
        || chr(10)
        || '- Designed advanced state management with Redux and Zustand, enabling the successful delivery of complex enterprise features with high performance and maintainability.'
        || chr(10)
        || '- Built and maintained React + TypeScript UIs using Material UI and Storybook, creating premium, consistent user experiences across the application.'
        || chr(10)
        || '- Owned end-to-end development and bug fixing across frontend and backend, supporting distributed US and LATAM teams while ensuring high-quality deliveries.'
        || chr(10)
        || '- Led Scrumban processes with Jira and GitHub, driving seamless collaboration across 4 countries and improving cross-team alignment and delivery cadence.',
      'es',
      '- Spearheaded full-stack project from inception to production (0 to 1) using React, Go Lang, and GraphQL, delivering a scalable enterprise solution on time and in production.'
        || chr(10)
        || '- Designed advanced state management with Redux and Zustand, enabling the successful delivery of complex enterprise features with high performance and maintainability.'
        || chr(10)
        || '- Built and maintained React + TypeScript UIs using Material UI and Storybook, creating premium, consistent user experiences across the application.'
        || chr(10)
        || '- Owned end-to-end development and bug fixing across frontend and backend, supporting distributed US and LATAM teams while ensuring high-quality deliveries.'
        || chr(10)
        || '- Led Scrumban processes with Jira and GitHub, driving seamless collaboration across 4 countries and improving cross-team alignment and delivery cadence.',
      'pt',
      '- Spearheaded full-stack project from inception to production (0 to 1) using React, Go Lang, and GraphQL, delivering a scalable enterprise solution on time and in production.'
        || chr(10)
        || '- Designed advanced state management with Redux and Zustand, enabling the successful delivery of complex enterprise features with high performance and maintainability.'
        || chr(10)
        || '- Built and maintained React + TypeScript UIs using Material UI and Storybook, creating premium, consistent user experiences across the application.'
        || chr(10)
        || '- Owned end-to-end development and bug fixing across frontend and backend, supporting distributed US and LATAM teams while ensuring high-quality deliveries.'
        || chr(10)
        || '- Led Scrumban processes with Jira and GitHub, driving seamless collaboration across 4 countries and improving cross-team alignment and delivery cadence.'
    ),
    '2022-01-01',
    '2022-09-30',
    3
  ),
  (
    'b1111111-1111-4111-8111-000000000005'::uuid,
    'PayPal',
    null,
    jsonb_build_object(
      'en',
      'Senior Front-End Developer (via Taller Technologies)',
      'es',
      'Senior Front-End Developer (via Taller Technologies)',
      'pt',
      'Senior Front-End Developer (via Taller Technologies)'
    ),
    jsonb_build_object(
      'en',
      '- Delivered React + TypeScript components and pages for PayPal''s core production applications, directly contributing to one of the world''s largest fintech platforms.'
        || chr(10)
        || '- Managed dependency updates and conflict resolution across large-scale monorepos, ensuring zero downtime during critical maintenance cycles.'
        || chr(10)
        || '- Developed and resolved critical frontend features using GraphQL and Jest, improving user experience and reliability in high-traffic payment flows.'
        || chr(10)
        || '- Collaborated effectively with global teams across USA, India, Brazil, and Argentina using Jira and GitHub, supporting seamless delivery in a distributed environment.'
        || chr(10)
        || '- Applied clean code and SOLID principles in a high-stakes fintech environment under Scrum, maintaining high quality and architectural standards.',
      'es',
      '- Delivered React + TypeScript components and pages for PayPal''s core production applications, directly contributing to one of the world''s largest fintech platforms.'
        || chr(10)
        || '- Managed dependency updates and conflict resolution across large-scale monorepos, ensuring zero downtime during critical maintenance cycles.'
        || chr(10)
        || '- Developed and resolved critical frontend features using GraphQL and Jest, improving user experience and reliability in high-traffic payment flows.'
        || chr(10)
        || '- Collaborated effectively with global teams across USA, India, Brazil, and Argentina using Jira and GitHub, supporting seamless delivery in a distributed environment.'
        || chr(10)
        || '- Applied clean code and SOLID principles in a high-stakes fintech environment under Scrum, maintaining high quality and architectural standards.',
      'pt',
      '- Delivered React + TypeScript components and pages for PayPal''s core production applications, directly contributing to one of the world''s largest fintech platforms.'
        || chr(10)
        || '- Managed dependency updates and conflict resolution across large-scale monorepos, ensuring zero downtime during critical maintenance cycles.'
        || chr(10)
        || '- Developed and resolved critical frontend features using GraphQL and Jest, improving user experience and reliability in high-traffic payment flows.'
        || chr(10)
        || '- Collaborated effectively with global teams across USA, India, Brazil, and Argentina using Jira and GitHub, supporting seamless delivery in a distributed environment.'
        || chr(10)
        || '- Applied clean code and SOLID principles in a high-stakes fintech environment under Scrum, maintaining high quality and architectural standards.'
    ),
    '2021-04-01',
    '2021-12-31',
    4
  ),
  (
    'b1111111-1111-4111-8111-000000000006'::uuid,
    'Körber',
    null,
    jsonb_build_object(
      'en',
      'Senior Full-Stack Developer (via Jalasoft)',
      'es',
      'Senior Full-Stack Developer (via Jalasoft)',
      'pt',
      'Senior Full-Stack Developer (via Jalasoft)'
    ),
    jsonb_build_object(
      'en',
      '- Developed VSCode extensions using OpenAPI schema to auto-generate APIs, significantly boosting developer velocity and reducing manual integration effort.'
        || chr(10)
        || '- Built interactive KPI data visualizations for supply chain management, enabling real-time data-driven decisions and improving operational visibility.'
        || chr(10)
        || '- Delivered full-stack features across React, Vue.js, Node.js, and .NET Core on Azure, supporting scalable enterprise applications.'
        || chr(10)
        || '- Modernized legacy Knockout.js codebases to Vue.js while enforcing clean code and SOLID principles, improving maintainability and reducing technical debt.'
        || chr(10)
        || '- Drove Scrumban workflows with Jira and GitHub for distributed US-Bolivia teams, enhancing cross-team collaboration and delivery efficiency.',
      'es',
      '- Developed VSCode extensions using OpenAPI schema to auto-generate APIs, significantly boosting developer velocity and reducing manual integration effort.'
        || chr(10)
        || '- Built interactive KPI data visualizations for supply chain management, enabling real-time data-driven decisions and improving operational visibility.'
        || chr(10)
        || '- Delivered full-stack features across React, Vue.js, Node.js, and .NET Core on Azure, supporting scalable enterprise applications.'
        || chr(10)
        || '- Modernized legacy Knockout.js codebases to Vue.js while enforcing clean code and SOLID principles, improving maintainability and reducing technical debt.'
        || chr(10)
        || '- Drove Scrumban workflows with Jira and GitHub for distributed US-Bolivia teams, enhancing cross-team collaboration and delivery efficiency.',
      'pt',
      '- Developed VSCode extensions using OpenAPI schema to auto-generate APIs, significantly boosting developer velocity and reducing manual integration effort.'
        || chr(10)
        || '- Built interactive KPI data visualizations for supply chain management, enabling real-time data-driven decisions and improving operational visibility.'
        || chr(10)
        || '- Delivered full-stack features across React, Vue.js, Node.js, and .NET Core on Azure, supporting scalable enterprise applications.'
        || chr(10)
        || '- Modernized legacy Knockout.js codebases to Vue.js while enforcing clean code and SOLID principles, improving maintainability and reducing technical debt.'
        || chr(10)
        || '- Drove Scrumban workflows with Jira and GitHub for distributed US-Bolivia teams, enhancing cross-team collaboration and delivery efficiency.'
    ),
    '2019-06-01',
    '2021-04-30',
    5
  ),
  (
    'b1111111-1111-4111-8111-000000000007'::uuid,
    'Xtime by Cox Automotive',
    null,
    jsonb_build_object(
      'en',
      'Lead Full-Stack Developer (via CodeRoad Inc.)',
      'es',
      'Lead Full-Stack Developer (via CodeRoad Inc.)',
      'pt',
      'Lead Full-Stack Developer (via CodeRoad Inc.)'
    ),
    jsonb_build_object(
      'en',
      '- Led and mentored 9-developer team building secure, globally scalable SaaS traceability platform.'
        || chr(10)
        || '- Architected AWS Serverless solution with Lambda, DynamoDB, Terraform, and GraphQL for production-grade performance.'
        || chr(10)
        || '- Delivered full-stack React + Node.js features while modernizing legacy Ext.js and Angular 4 systems for US client.'
        || chr(10)
        || '- Implemented item-level traceability solutions on a production-grade cloud-hosted SaaS platform.'
        || chr(10)
        || '- Started as a junior software developer and promoted to team leader after 1 year of high impact delivery.',
      'es',
      '- Led and mentored 9-developer team building secure, globally scalable SaaS traceability platform.'
        || chr(10)
        || '- Architected AWS Serverless solution with Lambda, DynamoDB, Terraform, and GraphQL for production-grade performance.'
        || chr(10)
        || '- Delivered full-stack React + Node.js features while modernizing legacy Ext.js and Angular 4 systems for US client.'
        || chr(10)
        || '- Implemented item-level traceability solutions on a production-grade cloud-hosted SaaS platform.'
        || chr(10)
        || '- Started as a junior software developer and promoted to team leader after 1 year of high impact delivery.',
      'pt',
      '- Led and mentored 9-developer team building secure, globally scalable SaaS traceability platform.'
        || chr(10)
        || '- Architected AWS Serverless solution with Lambda, DynamoDB, Terraform, and GraphQL for production-grade performance.'
        || chr(10)
        || '- Delivered full-stack React + Node.js features while modernizing legacy Ext.js and Angular 4 systems for US client.'
        || chr(10)
        || '- Implemented item-level traceability solutions on a production-grade cloud-hosted SaaS platform.'
        || chr(10)
        || '- Started as a junior software developer and promoted to team leader after 1 year of high impact delivery.'
    ),
    '2014-01-01',
    '2019-04-30',
    6
  ),
  (
    'b1111111-1111-4111-8111-000000000008'::uuid,
    'Universidad Católica Boliviana',
    null,
    jsonb_build_object(
      'en',
      'Office Assistant',
      'es',
      'Asistente de oficina',
      'pt',
      'Assistente de escritório'
    ),
    jsonb_build_object(
      'en',
      'La Paz, Bolivia. Assistant of the Environmental Engineering career''s chief.',
      'es',
      'La Paz, Bolivia. Asistente del jefe de carrera de Ingeniería Ambiental.',
      'pt',
      'La Paz, Bolívia. Assistente do chefe do curso de Engenharia Ambiental.'
    ),
    '2012-08-01',
    '2013-12-31',
    7
  )
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- experience_technology_tags (dedupe like project_technology_tags seed)
-- ---------------------------------------------------------------------------

insert into public.experience_technology_tags (id, experience_id, label, sort_order)
select gen_random_uuid(), 'b1111111-1111-4111-8111-000000000001'::uuid, v.label, v.sort_order
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
  select 1 from public.experiences e where e.id = 'b1111111-1111-4111-8111-000000000001'::uuid
)
and not exists (
  select 1
  from public.experience_technology_tags t
  where
    t.experience_id = 'b1111111-1111-4111-8111-000000000001'::uuid
    and t.label = v.label
);

insert into public.experience_technology_tags (id, experience_id, label, sort_order)
select gen_random_uuid(), 'b1111111-1111-4111-8111-000000000002'::uuid, v.label, v.sort_order
from (
  values
    ('React', 0),
    ('Next.js', 1),
    ('TypeScript', 2),
    ('JavaScript', 3),
    ('HTML5', 4),
    ('CSS3', 5),
    ('SASS', 6),
    ('Highcharts', 7),
    ('Cypress', 8),
    ('Playwright', 9),
    ('RTK Query', 10),
    ('Figma', 11),
    ('Jest', 12),
    ('Git', 13),
    ('GitHub', 14),
    ('GitHub Actions', 15),
    ('Microfrontends', 16),
    ('Agile', 17),
    ('Scrum', 18),
    ('Jira', 19),
    ('Confluence', 20)
) as v(label, sort_order)
where exists (
  select 1 from public.experiences e where e.id = 'b1111111-1111-4111-8111-000000000002'::uuid
)
and not exists (
  select 1
  from public.experience_technology_tags t
  where
    t.experience_id = 'b1111111-1111-4111-8111-000000000002'::uuid
    and t.label = v.label
);

insert into public.experience_technology_tags (id, experience_id, label, sort_order)
select gen_random_uuid(), 'b1111111-1111-4111-8111-000000000003'::uuid, v.label, v.sort_order
from (
  values
    ('NestJS', 0),
    ('Node.js', 1),
    ('Express', 2),
    ('React', 3),
    ('TypeScript', 4),
    ('JavaScript', 5),
    ('Angular', 6),
    ('HTML5', 7),
    ('CSS3', 8),
    ('SASS', 9),
    ('Jest', 10),
    ('Microfrontends', 11),
    ('Redux', 12),
    ('Git', 13),
    ('GitHub', 14),
    ('GitHub Actions', 15),
    ('PostgreSQL', 16),
    ('MongoDB', 17),
    ('GraphQL', 18),
    ('AWS', 19),
    ('Agile', 20),
    ('Scrum', 21),
    ('Jira', 22),
    ('Confluence', 23)
) as v(label, sort_order)
where exists (
  select 1 from public.experiences e where e.id = 'b1111111-1111-4111-8111-000000000003'::uuid
)
and not exists (
  select 1
  from public.experience_technology_tags t
  where
    t.experience_id = 'b1111111-1111-4111-8111-000000000003'::uuid
    and t.label = v.label
);

insert into public.experience_technology_tags (id, experience_id, label, sort_order)
select gen_random_uuid(), 'b1111111-1111-4111-8111-000000000004'::uuid, v.label, v.sort_order
from (
  values
    ('React', 0),
    ('Redux', 1),
    ('Zustand', 2),
    ('Material UI', 3),
    ('Storybook', 4),
    ('Node.js', 5),
    ('TypeScript', 6),
    ('Jest', 7),
    ('Go', 8),
    ('GraphQL', 9),
    ('HTML5', 10),
    ('CSS3', 11),
    ('JavaScript', 12),
    ('Git', 13),
    ('GitHub', 14),
    ('Agile', 15),
    ('Scrum', 16),
    ('Kanban', 17)
) as v(label, sort_order)
where exists (
  select 1 from public.experiences e where e.id = 'b1111111-1111-4111-8111-000000000004'::uuid
)
and not exists (
  select 1
  from public.experience_technology_tags t
  where
    t.experience_id = 'b1111111-1111-4111-8111-000000000004'::uuid
    and t.label = v.label
);

insert into public.experience_technology_tags (id, experience_id, label, sort_order)
select gen_random_uuid(), 'b1111111-1111-4111-8111-000000000005'::uuid, v.label, v.sort_order
from (
  values
    ('React', 0),
    ('Redux', 1),
    ('Storybook', 2),
    ('Node.js', 3),
    ('TypeScript', 4),
    ('Jest', 5),
    ('GraphQL', 6),
    ('HTML5', 7),
    ('CSS3', 8),
    ('GitHub', 9),
    ('JavaScript', 10),
    ('Git', 11),
    ('Agile', 12),
    ('Scrum', 13)
) as v(label, sort_order)
where exists (
  select 1 from public.experiences e where e.id = 'b1111111-1111-4111-8111-000000000005'::uuid
)
and not exists (
  select 1
  from public.experience_technology_tags t
  where
    t.experience_id = 'b1111111-1111-4111-8111-000000000005'::uuid
    and t.label = v.label
);

insert into public.experience_technology_tags (id, experience_id, label, sort_order)
select gen_random_uuid(), 'b1111111-1111-4111-8111-000000000006'::uuid, v.label, v.sort_order
from (
  values
    ('React', 0),
    ('Vue.js', 1),
    ('Knockout.js', 2),
    ('Node.js', 3),
    ('TypeScript', 4),
    ('C#', 5),
    ('.NET Core', 6),
    ('Storybook', 7),
    ('Mocha', 8),
    ('HTML5', 9),
    ('CSS3', 10),
    ('JavaScript', 11),
    ('Git', 12),
    ('GitHub', 13),
    ('Azure', 14),
    ('Agile', 15),
    ('Scrum', 16)
) as v(label, sort_order)
where exists (
  select 1 from public.experiences e where e.id = 'b1111111-1111-4111-8111-000000000006'::uuid
)
and not exists (
  select 1
  from public.experience_technology_tags t
  where
    t.experience_id = 'b1111111-1111-4111-8111-000000000006'::uuid
    and t.label = v.label
);

insert into public.experience_technology_tags (id, experience_id, label, sort_order)
select gen_random_uuid(), 'b1111111-1111-4111-8111-000000000007'::uuid, v.label, v.sort_order
from (
  values
    ('React', 0),
    ('Redux', 1),
    ('ExtJS', 2),
    ('Reactstrap', 3),
    ('Storybook', 4),
    ('Node.js', 5),
    ('TypeScript', 6),
    ('Jest', 7),
    ('Bootstrap', 8),
    ('GraphQL', 9),
    ('AWS', 10),
    ('Serverless', 11),
    ('Terraform', 12),
    ('Sencha Touch', 13),
    ('Java', 14),
    ('SQL Server', 15),
    ('Hibernate', 16),
    ('Angular', 17),
    ('Git', 18),
    ('Agile', 19),
    ('Scrum', 20)
) as v(label, sort_order)
where exists (
  select 1 from public.experiences e where e.id = 'b1111111-1111-4111-8111-000000000007'::uuid
)
and not exists (
  select 1
  from public.experience_technology_tags t
  where
    t.experience_id = 'b1111111-1111-4111-8111-000000000007'::uuid
    and t.label = v.label
);
