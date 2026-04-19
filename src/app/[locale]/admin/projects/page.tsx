import { getTranslations } from "next-intl/server";
import {
  createProject,
  deleteProject,
  updateProject,
} from "@/app/[locale]/admin/actions";
import { getProjects } from "@/lib/data/portfolio";
import { pickLocalized, type LocalizedText } from "@/lib/i18n-content";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export default async function AdminProjectsPage({ params }: Props) {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = await getTranslations();
  const projects = await getProjects();

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-headline text-3xl font-bold">
          {t("admin.projects")}
        </h1>
        <p className="text-on-surface-variant mt-2 text-sm">
          Tags are comma-separated. Image path is a Supabase storage key like{" "}
          <code>project-media/hero.png</code>.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="font-headline text-lg font-semibold">Existing</h2>
        <div className="space-y-3">
          {projects.length === 0 ? (
            <p className="text-on-surface-variant text-sm">No projects yet.</p>
          ) : (
            projects.map((p) => (
              <div
                className="bg-surface-container flex flex-col gap-3 rounded-sm p-4"
                key={p.id}
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="font-headline text-base font-semibold">
                      {pickLocalized(p.title, loc)}
                    </div>
                    <div className="text-on-surface-variant mt-2 text-sm">
                      {pickLocalized(p.description, loc)}
                    </div>
                    <div className="text-on-surface-variant mt-2 text-xs">
                      {p.url ?? p.repo_url ?? ""}
                    </div>
                  </div>
                  <form action={deleteProject}>
                    <input name="id" type="hidden" value={p.id} />
                    <input name="locale" type="hidden" value={locale} />
                    <button
                      className="text-on-surface-variant hover:text-primary-container text-xs tracking-widest uppercase"
                      type="submit"
                    >
                      Delete
                    </button>
                  </form>
                </div>
                <details className="border-outline-variant/10 border-t pt-3">
                  <summary className="text-on-surface-variant hover:text-primary-container cursor-pointer text-xs tracking-widest uppercase">
                    Edit
                  </summary>
                  <form
                    action={updateProject}
                    className="mt-3 grid gap-3 md:grid-cols-2"
                  >
                    <input name="id" type="hidden" value={p.id} />
                    <input name="locale" type="hidden" value={locale} />
                    <Localized name="title" rows={2} values={p.title} />
                    <Localized
                      name="description"
                      rows={5}
                      values={p.description}
                    />
                    <label className="space-y-2">
                      <span className="text-outline-variant text-xs tracking-widest uppercase">
                        url
                      </span>
                      <input
                        className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
                        defaultValue={p.url ?? ""}
                        name="url"
                        type="url"
                      />
                    </label>
                    <label className="space-y-2">
                      <span className="text-outline-variant text-xs tracking-widest uppercase">
                        repo_url
                      </span>
                      <input
                        className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
                        defaultValue={p.repo_url ?? ""}
                        name="repo_url"
                        type="url"
                      />
                    </label>
                    <label className="space-y-2 md:col-span-2">
                      <span className="text-outline-variant text-xs tracking-widest uppercase">
                        image_path
                      </span>
                      <input
                        className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
                        defaultValue={p.image_path ?? ""}
                        name="image_path"
                        placeholder="project-media/cover.png"
                      />
                    </label>
                    <label className="space-y-2 md:col-span-2">
                      <span className="text-outline-variant text-xs tracking-widest uppercase">
                        tags (comma-separated)
                      </span>
                      <input
                        className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
                        defaultValue={p.tags.map((x) => x.label).join(", ")}
                        name="tags"
                        placeholder="Next.js, Supabase, Tailwind"
                      />
                    </label>
                    <label className="space-y-2">
                      <span className="text-outline-variant text-xs tracking-widest uppercase">
                        sort_order
                      </span>
                      <input
                        className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
                        defaultValue={p.sort_order}
                        name="sort_order"
                        type="number"
                      />
                    </label>
                    <div className="md:col-span-2">
                      <button
                        className="bg-primary-container font-headline text-on-primary-container rounded-sm px-6 py-3 text-sm font-semibold"
                        type="submit"
                      >
                        {t("admin.save")}
                      </button>
                    </div>
                  </form>
                </details>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-headline text-lg font-semibold">Add project</h2>
        <form action={createProject} className="grid gap-3 md:grid-cols-2">
          <input name="locale" type="hidden" value={locale} />
          <Localized name="title" rows={2} />
          <Localized name="description" rows={5} />
          <label className="space-y-2">
            <span className="text-outline-variant text-xs tracking-widest uppercase">
              url
            </span>
            <input
              className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
              name="url"
              type="url"
            />
          </label>
          <label className="space-y-2">
            <span className="text-outline-variant text-xs tracking-widest uppercase">
              repo_url
            </span>
            <input
              className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
              name="repo_url"
              type="url"
            />
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-outline-variant text-xs tracking-widest uppercase">
              image_path
            </span>
            <input
              className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
              name="image_path"
              placeholder="project-media/cover.png"
            />
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-outline-variant text-xs tracking-widest uppercase">
              tags (comma-separated)
            </span>
            <input
              className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
              name="tags"
              placeholder="Next.js, Supabase, Tailwind"
            />
          </label>
          <label className="space-y-2">
            <span className="text-outline-variant text-xs tracking-widest uppercase">
              sort_order
            </span>
            <input
              className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
              defaultValue={0}
              name="sort_order"
              type="number"
            />
          </label>
          <div className="md:col-span-2">
            <button
              className="bg-primary-container font-headline text-on-primary-container rounded-sm px-6 py-3 text-sm font-semibold"
              type="submit"
            >
              {t("admin.save")}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function Localized({
  name,
  rows = 3,
  values,
}: {
  name: string;
  rows?: number;
  values?: LocalizedText;
}) {
  return (
    <div className="grid gap-3 md:col-span-2 md:grid-cols-3">
      {(["en", "es", "pt"] as const).map((l) => (
        <label className="space-y-2" key={l}>
          <span className="text-on-surface-variant text-[10px] tracking-widest uppercase">
            {name}.{l}
          </span>
          <textarea
            className="border-outline-variant/20 bg-surface-container min-h-[70px] w-full rounded-sm border px-3 py-2 text-sm"
            defaultValue={values?.[l] ?? ""}
            name={`${name}.${l}`}
            required={l === "en"}
            rows={rows}
          />
        </label>
      ))}
    </div>
  );
}
