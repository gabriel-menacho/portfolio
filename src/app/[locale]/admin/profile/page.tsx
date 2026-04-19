import { getTranslations } from "next-intl/server";
import { AdminProfileForms } from "@/components/admin/admin-profile-forms";
import { getProfile } from "@/lib/data/portfolio";
import { pickLocalized } from "@/lib/i18n-content";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export default async function AdminProfilePage({ params }: Props) {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = await getTranslations();
  const profile = await getProfile();

  const p = profile;
  const dn = p?.display_name;
  const hl = p?.headline;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-headline text-3xl font-bold">
          {t("admin.profile")}
        </h1>
        <p className="text-on-surface-variant mt-2 text-sm">
          Localized fields apply to EN/ES/PT across the public site.
        </p>
      </div>

      <AdminProfileForms locale={locale} profile={profile} />

      <div className="bg-surface-container-lowest text-on-surface-variant rounded-sm p-6 text-xs">
        <div className="font-headline text-primary-fixed-dim text-[10px] tracking-widest uppercase">
          Live preview ({loc})
        </div>
        <div className="mt-3 space-y-2">
          <div>
            <span className="text-outline-variant">Name:</span>{" "}
            {pickLocalized(dn ?? null, loc)}
          </div>
          <div>
            <span className="text-outline-variant">Headline:</span>{" "}
            {pickLocalized(hl ?? null, loc)}
          </div>
        </div>
      </div>
    </div>
  );
}
