import { getTranslations } from "next-intl/server";
import { deleteHireRequest } from "@/app/actions/hire-request";
import { getHireRequests } from "@/lib/data/hire-requests";
import type { Locale } from "@/i18n/routing";
import type { HireRequest } from "@/types/portfolio";

type Props = { params: Promise<{ locale: string }> };

function employmentTypeLabel(
  raw: string | null,
  t: Awaited<ReturnType<typeof getTranslations>>,
): string {
  switch (raw) {
    case "full_time":
      return t("hire.fields.employmentTypes.full_time");
    case "contract":
      return t("hire.fields.employmentTypes.contract");
    case "freelance":
      return t("hire.fields.employmentTypes.freelance");
    case "other":
      return t("hire.fields.employmentTypes.other");
    default:
      return raw?.trim() || "—";
  }
}

function formatWhen(iso: string, locale: string) {
  try {
    return new Date(iso).toLocaleString(locale, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

function HireRequestCard({
  row,
  locale,
  t,
}: {
  row: HireRequest;
  locale: string;
  t: Awaited<ReturnType<typeof getTranslations>>;
}) {
  const company = row.company?.trim();
  const titleLine = [row.job_title, company].filter(Boolean).join(" · ");

  return (
    <article className="bg-surface-container border-outline-variant/15 rounded-sm border p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 flex-1 space-y-2">
          <h2 className="font-headline text-lg font-semibold tracking-tight">
            {titleLine}
          </h2>
          <p className="text-primary-container text-sm font-medium break-all">
            {row.recruiter_email}
          </p>
          {row.recruiter_name?.trim() ? (
            <p className="text-on-surface-variant text-sm">
              {row.recruiter_name}
            </p>
          ) : null}
          <p className="text-on-surface-variant text-xs">
            {formatWhen(row.created_at, locale)}
            {" · "}
            {employmentTypeLabel(row.employment_type, t)}
            {row.job_location?.trim()
              ? ` · ${row.job_location.trim()}`
              : ""}
            {row.is_remote ? ` · ${t("hire.fields.remote")}` : ""}
            {row.salary_range?.trim()
              ? ` · ${row.salary_range.trim()}`
              : ""}
            {row.locale?.trim() ? ` · ${row.locale}` : ""}
          </p>
        </div>
        <form action={deleteHireRequest} className="shrink-0">
          <input name="id" type="hidden" value={row.id} />
          <input name="locale" type="hidden" value={locale} />
          <button
            className="border-outline-variant/25 font-headline text-on-surface-variant hover:border-red-500 hover:text-red-600 dark:hover:text-red-400 cursor-pointer rounded-sm border px-4 py-2 text-xs tracking-widest uppercase"
            type="submit"
          >
            {t("admin.hireRequestsDelete")}
          </button>
        </form>
      </div>
      <div className="border-outline-variant/10 mt-4 border-t pt-4">
        <h3 className="font-headline text-outline-variant mb-2 text-[10px] tracking-[0.25em] uppercase">
          {t("hire.fields.jobDescription")}
        </h3>
        <p className="text-on-surface whitespace-pre-wrap text-sm leading-relaxed">
          {row.job_description}
        </p>
      </div>
      {row.message?.trim() ? (
        <div className="border-outline-variant/10 mt-4 border-t pt-4">
          <h3 className="font-headline text-outline-variant mb-2 text-[10px] tracking-[0.25em] uppercase">
            {t("hire.fields.message")}
          </h3>
          <p className="text-on-surface-variant whitespace-pre-wrap text-sm leading-relaxed">
            {row.message}
          </p>
        </div>
      ) : null}
      {row.user_agent?.trim() ? (
        <p className="text-outline-variant mt-4 line-clamp-2 text-[10px] break-all">
          {row.user_agent}
        </p>
      ) : null}
    </article>
  );
}

export default async function AdminHireRequestsPage({ params }: Props) {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = await getTranslations({ locale: loc });
  const rows = await getHireRequests();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">
          {t("admin.hireRequests")}
        </h1>
        <p className="text-on-surface-variant mt-2 max-w-2xl text-sm">
          {t("admin.hireRequestsSubtitle")}
        </p>
      </div>

      {rows.length === 0 ? (
        <p className="text-on-surface-variant text-sm">
          {t("admin.hireRequestsEmpty")}
        </p>
      ) : (
        <ul className="space-y-6">
          {rows.map((row) => (
            <li key={row.id}>
              <HireRequestCard locale={locale} row={row} t={t} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
