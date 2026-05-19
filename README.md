# Portfolio

Personal portfolio site built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**, **next-intl** (EN / ES / PT), and **Supabase** (Postgres + Auth + Storage).

## Features

- Localized marketing home: hero (photo + intro), stack groups, experience timeline, projects, contact (`mailto` + copy + social links), and a **Hire me** dialog that saves recruiter submissions to Supabase.
- **Admin** (GitHub OAuth): CRUD for profile, stack, experiences, projects; avatar + resume PDF override uploads; **Hire requests** inbox for submissions from the public form.
- **Resume**: ATS-oriented PDF generated from the same database content (`GET /api/resume/pdf?locale=en`). Optional uploaded PDF replaces the primary download when configured.
- **SEO**: `sitemap.xml`, `robots.txt`, per-page metadata.
- **Theming**: light / dark (and system) via `next-themes`, with CSS variable palettes in `src/app/globals.css`. The choice is persisted in an **httpOnly** cookie (`portfolio-theme`: `light` \| `dark` \| `system`) via a server action and echoed on each request through middleware (`x-portfolio-theme`) so the server can render the correct `<html>` class before hydration.

## Prerequisites

- Node.js LTS
- A Supabase project

## Environment variables

Copy `.env.example` to `.env.local` and fill in values:

| Variable                        | Purpose                                                                           |
| ------------------------------- | --------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL                                                              |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon (public) key                                                        |
| `NEXT_PUBLIC_SITE_URL`          | Canonical site URL (production); used for OAuth redirects                         |
| `ALLOWED_GITHUB_IDS`            | Comma-separated GitHub **numeric** user IDs permitted to access `/[locale]/admin` |

If `ALLOWED_GITHUB_IDS` is empty, **no GitHub user can pass the admin gate** (after login they are signed out and redirected to the forbidden page).

## Supabase setup

1. In the Supabase SQL editor (or CLI), run migrations in order: `supabase/migrations/20260418190000_init.sql`, then `supabase/migrations/20260419000000_seed_portfolio_self_project.sql`, then later migrations including `20260429120000_autonexus_project_url_appetize.sql`, `20260504120000_hire_requests.sql`, `20260519120000_seed_project_legisflow.sql`, and `20260519130000_profile_show_home_projects_section.sql` (or use Supabase CLI `db push` / linked project migrations).

### Hire requests (`hire_requests`)

The `hire_requests` table stores public “Hire me” form submissions. **RLS:** `anon` and `authenticated` may **insert**; only **authenticated** users may **select** and **delete** (so visitors cannot read others’ submissions; you read them signed in under **Admin → Hire requests**). No extra environment variables are required beyond the existing `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
2. **Authentication → Providers → GitHub**: enable GitHub, add client id/secret from a GitHub OAuth app.
3. **Authentication → URL configuration**:
   - Site URL: your deployed origin (e.g. `https://example.com`) or `http://localhost:3000` for local dev.
   - Additional redirect URLs must include your app callback routes, e.g. `http://localhost:3000/api/auth/callback` and `https://YOUR_DOMAIN/api/auth/callback` (these match `redirectTo` in `GithubSignIn`).
4. Create a **GitHub OAuth App** using Supabase’s documented callback URL for the GitHub provider (shown in the Supabase dashboard). After GitHub authenticates the user, Supabase completes the OAuth exchange and returns the browser to your `redirectTo` URL with a `code` query param; `/api/auth/callback` exchanges that code for a session cookie.

### Storage

The migration declares public buckets `avatars`, `company-logos`, `project-media`, and `resumes` with policies for public read and authenticated write. Uploads from the admin UI store keys like `avatars/<uuid>-filename.png`.

### Optional seed data

Insert `stack_groups`, `technologies`, `experiences`, and `projects` via the admin UI, or run SQL inserts against the tables created in the migration. Keep `profile.id = 1` as the singleton row (already inserted).

The migration `20260419000000_seed_portfolio_self_project.sql` inserts a **“this portfolio”** project row (fixed id) plus technology tags. Set your real **site URL** and **GitHub repo URL** in **Admin → Projects** after deploy if you left them empty in the database.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
npm run format       # Prettier write
npm run format:check # Prettier check (CI)
npm run test:e2e   # Playwright smoke (starts dev server)
```

## Deployment (Vercel)

1. Create a Vercel project pointing at this repository.
2. Set the same environment variables as in `.env.example` (`NEXT_PUBLIC_SITE_URL` should be the production URL).
3. Redeploy after changing Supabase auth URLs or secrets.

## Design assets

Static HTML references live under `designs/` (`portfolio_home_*`, `project_showcase_section`, `admin_dashboard_*`, `manage_*`). Tokens and rules are documented in `designs/linear_logic/DESIGN.md`.

## Repository conventions

See `agents.md` for stack choices and folder conventions.
