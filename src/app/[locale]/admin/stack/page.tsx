import { getTranslations } from "next-intl/server";
import {
  createStackGroup,
  createTechnology,
  deleteStackGroup,
  deleteTechnology,
  updateStackGroup,
  updateTechnology,
} from "@/app/[locale]/admin/actions";
import {
  AdminFormSubmitButton,
  AdminServerActionForm,
} from "@/components/admin/admin-server-action-form";
import { getStack } from "@/lib/data/portfolio";
import { pickLocalized, type LocalizedText } from "@/lib/i18n-content";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export default async function AdminStackPage({ params }: Props) {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = await getTranslations();
  const groups = await getStack();

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-headline text-3xl font-bold">{t("admin.stack")}</h1>
        <p className="text-on-surface-variant mt-2 text-sm">
          Groups power the bento layout. Use slugs like <code>frontend</code>,{" "}
          <code>cloud</code>, <code>mobile</code> for icon mapping.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="font-headline text-lg font-semibold">Existing groups</h2>
        <div className="space-y-3">
          {groups.length === 0 ? (
            <p className="text-on-surface-variant text-sm">No groups yet.</p>
          ) : (
            groups.map(({ group, technologies }) => (
              <div
                className="bg-surface-container rounded-sm p-4"
                key={group.id}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="font-headline text-base font-semibold">
                      {pickLocalized(group.title, loc)} ({group.slug})
                    </div>
                    <div className="text-on-surface-variant mt-2 text-xs">
                      {technologies.map((x) => x.name).join(", ") ||
                        "No technologies"}
                    </div>
                  </div>
                  <AdminServerActionForm
                    action={deleteStackGroup}
                    successMessage={t("admin.deleted")}
                  >
                    <input name="id" type="hidden" value={group.id} />
                    <input name="locale" type="hidden" value={locale} />
                    <AdminFormSubmitButton
                      pendingLabel={t("admin.deleting")}
                      variant="dangerText"
                    >
                      Delete group
                    </AdminFormSubmitButton>
                  </AdminServerActionForm>
                </div>
                <details className="border-outline-variant/10 mt-3 border-t pt-3">
                  <summary className="text-on-surface-variant hover:text-primary-container cursor-pointer text-xs tracking-widest uppercase">
                    Edit group
                  </summary>
                  <AdminServerActionForm
                    action={updateStackGroup}
                    successMessage={t("admin.saved")}
                  >
                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                    <input name="id" type="hidden" value={group.id} />
                    <input name="locale" type="hidden" value={locale} />
                    <label className="space-y-2 md:col-span-2">
                      <span className="text-outline-variant text-xs tracking-widest uppercase">
                        slug
                      </span>
                      <input
                        className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
                        defaultValue={group.slug}
                        name="slug"
                        required
                      />
                    </label>
                    <LocalizedInputs name="title" values={group.title} />
                    <label className="space-y-2">
                      <span className="text-outline-variant text-xs tracking-widest uppercase">
                        grid_class
                      </span>
                      <input
                        className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
                        defaultValue={group.grid_class}
                        name="grid_class"
                      />
                    </label>
                    <label className="space-y-2">
                      <span className="text-outline-variant text-xs tracking-widest uppercase">
                        variant
                      </span>
                      <select
                        className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
                        defaultValue={group.variant}
                        name="variant"
                      >
                        <option value="default">default</option>
                        <option value="featured">featured</option>
                      </select>
                    </label>
                    <label className="space-y-2">
                      <span className="text-outline-variant text-xs tracking-widest uppercase">
                        sort_order
                      </span>
                      <input
                        className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
                        defaultValue={group.sort_order}
                        name="sort_order"
                        type="number"
                      />
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
                <div className="border-outline-variant/10 mt-4 space-y-3 border-t pt-4">
                  {technologies.map((tech) => (
                    <div
                      className="flex flex-col gap-2 text-sm"
                      key={tech.id}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span>{tech.name}</span>
                        <AdminServerActionForm
                          action={deleteTechnology}
                          successMessage={t("admin.deleted")}
                        >
                          <input name="id" type="hidden" value={tech.id} />
                          <input name="locale" type="hidden" value={locale} />
                          <AdminFormSubmitButton
                            pendingLabel={t("admin.deleting")}
                            variant="dangerText"
                          >
                            Remove
                          </AdminFormSubmitButton>
                        </AdminServerActionForm>
                      </div>
                      <details>
                        <summary className="text-on-surface-variant hover:text-primary-container cursor-pointer text-xs tracking-widest uppercase">
                          Edit technology
                        </summary>
                        <AdminServerActionForm
                          action={updateTechnology}
                          successMessage={t("admin.saved")}
                        >
                          <div className="mt-2 grid gap-3 md:grid-cols-3">
                          <input name="id" type="hidden" value={tech.id} />
                          <input name="locale" type="hidden" value={locale} />
                          <label className="space-y-2 md:col-span-3">
                            <span className="text-outline-variant text-xs tracking-widest uppercase">
                              stack_group_id
                            </span>
                            <select
                              className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
                              defaultValue={tech.stack_group_id}
                              name="stack_group_id"
                              required
                            >
                              {groups.map(({ group: g }) => (
                                <option key={g.id} value={g.id}>
                                  {pickLocalized(g.title, loc)} ({g.slug})
                                </option>
                              ))}
                            </select>
                          </label>
                          <label className="space-y-2 md:col-span-2">
                            <span className="text-outline-variant text-xs tracking-widest uppercase">
                              name
                            </span>
                            <input
                              className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
                              defaultValue={tech.name}
                              name="name"
                              required
                            />
                          </label>
                          <label className="space-y-2">
                            <span className="text-outline-variant text-xs tracking-widest uppercase">
                              sort_order
                            </span>
                            <input
                              className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
                              defaultValue={tech.sort_order}
                              name="sort_order"
                              type="number"
                            />
                          </label>
                          <div className="md:col-span-3">
                            <AdminFormSubmitButton
                              pendingLabel={t("admin.saving")}
                              variant="primaryCompact"
                            >
                              {t("admin.save")}
                            </AdminFormSubmitButton>
                          </div>
                          </div>
                        </AdminServerActionForm>
                      </details>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-headline text-lg font-semibold">Add group</h2>
        <AdminServerActionForm
          action={createStackGroup}
          successMessage={t("admin.saved")}
        >
          <div className="grid gap-3 md:grid-cols-2">
          <input name="locale" type="hidden" value={locale} />
          <label className="space-y-2 md:col-span-2">
            <span className="text-outline-variant text-xs tracking-widest uppercase">
              slug
            </span>
            <input
              className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
              name="slug"
              placeholder="frontend"
              required
            />
          </label>
          <LocalizedInputs name="title" />
          <label className="space-y-2">
            <span className="text-outline-variant text-xs tracking-widest uppercase">
              grid_class
            </span>
            <input
              className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
              defaultValue="md:col-span-2"
              name="grid_class"
            />
          </label>
          <label className="space-y-2">
            <span className="text-outline-variant text-xs tracking-widest uppercase">
              variant
            </span>
            <select
              className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
              name="variant"
            >
              <option value="default">default</option>
              <option value="featured">featured</option>
            </select>
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

      <section className="space-y-4">
        <h2 className="font-headline text-lg font-semibold">Add technology</h2>
        <AdminServerActionForm
          action={createTechnology}
          successMessage={t("admin.saved")}
        >
          <div className="grid gap-3 md:grid-cols-3">
          <input name="locale" type="hidden" value={locale} />
          <label className="space-y-2 md:col-span-3">
            <span className="text-outline-variant text-xs tracking-widest uppercase">
              stack_group_id
            </span>
            <select
              className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
              name="stack_group_id"
              required
            >
              <option value="">Select group</option>
              {groups.map(({ group }) => (
                <option key={group.id} value={group.id}>
                  {pickLocalized(group.title, loc)} ({group.slug})
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-outline-variant text-xs tracking-widest uppercase">
              name
            </span>
            <input
              className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
              name="name"
              required
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
          <div className="md:col-span-3">
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

function LocalizedInputs({
  name,
  values,
}: {
  name: string;
  values?: LocalizedText;
}) {
  return (
    <div className="grid gap-3 md:col-span-2 md:grid-cols-3">
      {(["en", "es", "pt"] as const).map((l) => (
        <label className="space-y-2" key={l}>
          <span className="text-on-surface-variant text-[10px] tracking-widest uppercase">
            {name}.{l}
          </span>
          <input
            className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
            defaultValue={values?.[l] ?? ""}
            name={`${name}.${l}`}
            required={l === "en"}
          />
        </label>
      ))}
    </div>
  );
}
