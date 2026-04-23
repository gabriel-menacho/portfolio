import { getTranslations } from "next-intl/server";
import {
  createExperience,
  deleteExperience,
  setExperienceShowOnSite,
  updateExperience,
} from "@/app/[locale]/admin/actions";
import {
  AdminFormSubmitButton,
  AdminServerActionForm,
} from "@/components/admin/admin-server-action-form";
import { AdminSiteVisibilityToggleForm } from "@/components/admin/admin-site-visibility-toggle-form";
import { getExperiences } from "@/lib/data/portfolio";
import { pickLocalized, type LocalizedText } from "@/lib/i18n-content";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export default async function AdminExperiencesPage({ params }: Props) {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = await getTranslations();
  const experiences = await getExperiences();

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-headline text-3xl font-bold">
          {t("admin.experiences")}
        </h1>
        <p className="text-on-surface-variant mt-2 text-sm">
          Tags are comma-separated (e.g. <code>React, Postgres, AWS</code>).
          Logo path is a Supabase storage key like{" "}
          <code>company-logos/acme.png</code>.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="font-headline text-lg font-semibold">Existing</h2>
        <div className="space-y-3">
          {experiences.length === 0 ? (
            <p className="text-on-surface-variant text-sm">
              No experiences yet.
            </p>
          ) : (
            experiences.map((exp) => (
              <div
                className="bg-surface-container flex flex-col gap-3 rounded-sm p-4"
                key={exp.id}
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="font-headline text-base font-semibold">
                      {exp.company_name}
                    </div>
                    <div className="text-on-surface-variant mt-1 text-xs">
                      {pickLocalized(exp.role_title, loc)}
                    </div>
                    <div className="text-on-surface-variant mt-2 text-sm">
                      {pickLocalized(exp.description, loc)}
                    </div>
                    {!exp.show_on_site ? (
                      <p className="text-primary-container mt-2 text-xs">
                        {t("admin.hiddenFromSite")}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex shrink-0 flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-end">
                    <AdminSiteVisibilityToggleForm
                      action={setExperienceShowOnSite}
                      id={exp.id}
                      label={t("admin.showOnSite")}
                      locale={locale}
                      savedMessage={t("admin.saved")}
                      showOnSite={exp.show_on_site}
                    />
                    <AdminServerActionForm
                      action={deleteExperience}
                      successMessage={t("admin.deleted")}
                    >
                      <input name="id" type="hidden" value={exp.id} />
                      <input name="locale" type="hidden" value={locale} />
                      <AdminFormSubmitButton
                        pendingLabel={t("admin.deleting")}
                        variant="dangerText"
                      >
                        Delete
                      </AdminFormSubmitButton>
                    </AdminServerActionForm>
                  </div>
                </div>
                <details className="border-outline-variant/10 border-t pt-3">
                  <summary className="text-on-surface-variant hover:text-primary-container cursor-pointer text-xs tracking-widest uppercase">
                    Edit
                  </summary>
                  <AdminServerActionForm
                    action={updateExperience}
                    successMessage={t("admin.saved")}
                  >
                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                    <input name="id" type="hidden" value={exp.id} />
                    <input name="locale" type="hidden" value={locale} />
                    <label className="space-y-2 md:col-span-2">
                      <span className="text-outline-variant text-xs tracking-widest uppercase">
                        company_name
                      </span>
                      <input
                        className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
                        defaultValue={exp.company_name}
                        name="company_name"
                        required
                      />
                    </label>
                    <label className="space-y-2 md:col-span-2">
                      <span className="text-outline-variant text-xs tracking-widest uppercase">
                        company_logo_path
                      </span>
                      <input
                        className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
                        defaultValue={exp.company_logo_path ?? ""}
                        name="company_logo_path"
                        placeholder="company-logos/acme.png"
                      />
                    </label>
                    <Localized
                      name="role_title"
                      values={exp.role_title}
                    />
                    <Localized
                      name="description"
                      rows={5}
                      values={exp.description}
                    />
                    <label className="space-y-2">
                      <span className="text-outline-variant text-xs tracking-widest uppercase">
                        start_date
                      </span>
                      <input
                        className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
                        defaultValue={String(exp.start_date).slice(0, 10)}
                        name="start_date"
                        required
                        type="date"
                      />
                    </label>
                    <label className="space-y-2">
                      <span className="text-outline-variant text-xs tracking-widest uppercase">
                        end_date (optional)
                      </span>
                      <input
                        className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
                        defaultValue={
                          exp.end_date
                            ? String(exp.end_date).slice(0, 10)
                            : ""
                        }
                        name="end_date"
                        type="date"
                      />
                    </label>
                    <label className="space-y-2 md:col-span-2">
                      <span className="text-outline-variant text-xs tracking-widest uppercase">
                        tags (comma-separated)
                      </span>
                      <input
                        className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
                        defaultValue={exp.tags.map((x) => x.label).join(", ")}
                        name="tags"
                        placeholder="Kubernetes, Node.js, AWS"
                      />
                    </label>
                    <label className="space-y-2">
                      <span className="text-outline-variant text-xs tracking-widest uppercase">
                        sort_order
                      </span>
                      <input
                        className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
                        defaultValue={exp.sort_order}
                        name="sort_order"
                        type="number"
                      />
                    </label>
                    <label className="flex cursor-pointer items-center gap-2 md:col-span-2">
                      <input
                        className="accent-primary-container size-4"
                        defaultChecked={exp.show_on_site}
                        name="show_on_site"
                        type="checkbox"
                        value="on"
                      />
                      <span className="text-outline-variant text-xs tracking-widest uppercase">
                        {t("admin.showOnSite")}
                      </span>
                    </label>
                    <div className="md:col-span-2">
                      <AdminFormSubmitButton
                        pendingLabel={t("admin.saving")}
                        variant="primary"
                      >
                        {t("admin.save")}
                      </AdminFormSubmitButton>
                    </div>
                    </div>
                  </AdminServerActionForm>
                </details>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-headline text-lg font-semibold">Add experience</h2>
        <AdminServerActionForm
          action={createExperience}
          successMessage={t("admin.saved")}
        >
          <div className="grid gap-3 md:grid-cols-2">
          <input name="locale" type="hidden" value={locale} />
          <label className="space-y-2 md:col-span-2">
            <span className="text-outline-variant text-xs tracking-widest uppercase">
              company_name
            </span>
            <input
              className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
              name="company_name"
              required
            />
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-outline-variant text-xs tracking-widest uppercase">
              company_logo_path
            </span>
            <input
              className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
              name="company_logo_path"
              placeholder="company-logos/acme.png"
            />
          </label>
          <Localized name="role_title" />
          <Localized name="description" rows={5} />
          <label className="space-y-2">
            <span className="text-outline-variant text-xs tracking-widest uppercase">
              start_date
            </span>
            <input
              className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
              name="start_date"
              required
              type="date"
            />
          </label>
          <label className="space-y-2">
            <span className="text-outline-variant text-xs tracking-widest uppercase">
              end_date (optional)
            </span>
            <input
              className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
              name="end_date"
              type="date"
            />
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-outline-variant text-xs tracking-widest uppercase">
              tags (comma-separated)
            </span>
            <input
              className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
              name="tags"
              placeholder="Kubernetes, Node.js, AWS"
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
          <label className="flex cursor-pointer items-center gap-2 md:col-span-2">
            <input
              className="accent-primary-container size-4"
              defaultChecked
              name="show_on_site"
              type="checkbox"
              value="on"
            />
            <span className="text-outline-variant text-xs tracking-widest uppercase">
              {t("admin.showOnSite")}
            </span>
          </label>
          <div className="md:col-span-2">
            <AdminFormSubmitButton
              pendingLabel={t("admin.saving")}
              variant="primary"
            >
              {t("admin.save")}
            </AdminFormSubmitButton>
          </div>
          </div>
        </AdminServerActionForm>
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
            className="border-outline-variant/20 bg-surface-container min-h-[90px] w-full rounded-sm border px-3 py-2 text-sm"
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
