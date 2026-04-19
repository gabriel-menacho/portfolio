# Agent & contributor guide

This document defines the **repository layout**, **technology choices**, and **conventions** for a personal website built with **React**, **TypeScript**, and **Next.js**. Treat it as the source of truth when scaffolding, refactoring, or choosing dependencies.

---

## Core stack (non-negotiable)

| Layer      | Choice                          | Rationale                                                        |
| ---------- | ------------------------------- | ---------------------------------------------------------------- |
| Framework  | **Next.js** (App Router)        | SSR/RSC, routing, images, metadata, deployment on Vercel or Node |
| Language   | **TypeScript** (`strict: true`) | Safer refactors, better editor/agent support                     |
| UI library | **React**                       | Matches Next.js; prefer function components and hooks            |
| Runtime    | **Node.js** LTS                 | Align with Next.js supported versions                            |

Optional but recommended: **pnpm** for installs (fast, strict `node_modules` layout).

---

## Supporting “perfect” technologies

Use these defaults unless a task explicitly requires something else.

| Concern                | Preferred tool                                                  | Notes                                                                    |
| ---------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Styling                | **Tailwind CSS** + **CSS variables** for theme tokens           | Keep design tokens in one place; avoid inline style sprawl               |
| Class composition      | **clsx** + **tailwind-merge**                                   | Predictable `className` merging                                          |
| Fonts                  | **`next/font`**                                                 | Self-hosted, no layout shift                                             |
| Icons                  | **Lucide React** or **Phosphor React**                          | Tree-shakeable SVG icons                                                 |
| Forms + validation     | **React Hook Form** + **Zod**                                   | Typed schemas shared client/server where useful                          |
| Data fetching (client) | **TanStack Query**                                              | Caching, retries, stale-while-revalidate for API routes or external APIs |
| HTTP (typed clients)   | **ky** or native `fetch` + Zod parse                            | Keep boundaries explicit                                                 |
| Animations             | **CSS** first; **Motion** (Framer Motion successor) if needed   | Prefer reduced motion respect                                            |
| Content (blog/docs)    | **MDX** (`@next/mdx`) or **Contentlayer**-style generated types | Type-safe frontmatter                                                    |
| Lint / format          | **ESLint** (flat config) + **Prettier**                         | Single formatting truth                                                  |
| Tests                  | **Vitest** + **React Testing Library**; **Playwright** for e2e  | Fast unit tests; smoke critical flows                                    |
| Git hooks              | **lefthook** or **husky** + **lint-staged**                     | Enforce quality on commit                                                |

Avoid adding overlapping tools (e.g. multiple CSS-in-JS systems or multiple form libraries).

---

## Directory structure (App Router)

Target layout for a portfolio or marketing site:

```text
.
├── public/                 # Static assets (favicon, og images, fonts not via next/font)
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── layout.tsx      # Root layout: fonts, metadata, providers
│   │   ├── page.tsx        # Home
│   │   ├── globals.css     # Tailwind directives + global resets
│   │   ├── opengraph-image.* / icon.*
│   │   ├── (marketing)/    # Optional route group: landing, about, contact
│   │   ├── projects/
│   │   │   └── page.tsx
│   │   └── api/            # Route handlers if needed
│   ├── components/
│   │   ├── ui/             # Reusable primitives (Button, Card, Link)
│   │   └── ...             # Feature-specific components
│   ├── lib/                # Pure utilities, constants, env parsing
│   ├── hooks/              # Shared React hooks
│   ├── styles/             # Optional: extra CSS modules or tokens
│   └── types/              # Shared TS types (prefer colocating small types)
├── content/                # Optional: MD/MDX away from app/
├── agents.md               # This file
├── next.config.ts
├── package.json
└── README.md
```

**Rules:**

- **`src/app`**: routing, layouts, `loading.tsx`, `error.tsx`, `not-found.tsx`, route-level `metadata` / `generateMetadata`.
- **`src/components/ui`**: presentation-only building blocks; no business logic or data fetching.
- **`src/lib`**: `cn()` helper, `env.ts` (validated env vars), formatters, small algorithms.
- **Colocate** feature components with routes only when they are not reused elsewhere; otherwise lift to `components/`.
- **No** business logic in `app/` route files beyond orchestration—extract to `lib/` or server modules.

---

## Next.js conventions

- Prefer **Server Components** by default; add **`"use client"`** only for interactivity, browser APIs, or hooks.
- Prefer **Server Actions** for mutations when staying in the Next ecosystem; use **Route Handlers** (`app/api/.../route.ts`) for webhooks or non-React consumers.
- Use **`next/image`** for raster images; specify `width`/`height` or `fill` + layout constraints.
- Define **`metadata`** or **`generateMetadata`** per segment for SEO and social cards.
- Use **`next/link`** for internal navigation.

---

## TypeScript conventions

- Enable **`strict`**, **`noUncheckedIndexedAccess`** if team tolerates verbosity.
- Avoid `any`; use `unknown` + narrowing or Zod.
- Prefer **interfaces** for object shapes in public APIs; **type** for unions and mapped types.
- Centralize **environment variables** in `src/lib/env.ts` with Zod and fail fast at build/runtime.

---

## Styling conventions

- Use **Tailwind** utility-first; extract repeated patterns into small components, not giant class strings in JSX.
- **Dark mode**: `class` strategy on `html` or `next-themes` if toggling; keep tokens in CSS variables.
- Respect **`prefers-reduced-motion`** for large animations.

---

## Performance & quality bar

- Ship **Core Web Vitals**–friendly defaults: image sizing, font subsetting, minimal client JS.
- **Lighthouse**: aim for high performance/accessibility on key pages.
- **Bundle**: lazy-load heavy client-only sections with `dynamic(..., { ssr: false })` when justified.

---

## Agent workflow expectations

When implementing features in this repo:

1. Match this structure unless a migration plan is part of the task.
2. Prefer **adding tests** for non-trivial `lib/` and interactive components.
3. After dependency or config changes, ensure **`pnpm lint`** / **`pnpm test`** (or npm equivalents) pass.
4. Document **env vars** in `README.md` when introducing new ones.

---

## Version policy

Pin major versions in `package.json` and upgrade intentionally. For greenfield work, default to the **latest stable** Next.js and React versions supported together by the official Next.js release notes.

<!--
<!-- BEGIN:nextjs-agent-rules
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
