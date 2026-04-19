import { Building2 } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ExpandableText } from "@/components/expandable-text";
import { pickLocalized } from "@/lib/i18n-content";
import type { Locale } from "@/i18n/routing";
import type { Experience } from "@/types/portfolio";
import { publicObjectUrl } from "@/lib/storage";

function formatRange(
  start: string,
  end: string | null,
  locale: Locale,
  presentLabel: string,
) {
  const s = new Date(start);
  const e = end ? new Date(end) : null;
  const df = new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
  });
  return `${df.format(s)} — ${e ? df.format(e) : presentLabel}`;
}

export async function ExperienceSection({
  locale,
  experiences,
}: {
  locale: Locale;
  experiences: Experience[];
}) {
  const t = await getTranslations();
  const present = t("experience.present");
  const moreLabel = t("experience.more");
  const lessLabel = t("experience.less");

  return (
    <section
      className="bg-surface-container-low/30 py-24 md:py-32"
      id="experience"
    >
      <div className="mx-auto max-w-7xl px-8 md:px-12 lg:px-16">
        <div className="mb-16 text-center md:mb-20">
          <h2 className="font-headline text-on-surface mb-4 text-4xl font-bold tracking-tighter">
            {t("experience.title")}
          </h2>
          <p className="text-on-surface-variant mx-auto max-w-2xl">
            {t("experience.subtitle")}
          </p>
        </div>
        <div className="space-y-6">
          {experiences.length === 0 ? (
            <p className="text-on-surface-variant text-center">
              Add experiences from the admin console.
            </p>
          ) : (
            experiences.map((exp) => {
              const logo = publicObjectUrl(exp.company_logo_path);
              return (
                <div
                  className="bg-surface-container hover:bg-surface-container-high grid grid-cols-1 gap-2 rounded-sm p-1 transition-colors md:grid-cols-12"
                  key={exp.id}
                >
                  <div className="border-outline-variant/10 flex flex-col justify-between gap-6 p-8 md:col-span-3 md:border-r">
                    <div>
                      {logo ? (
                        <Image
                          alt=""
                          className="mb-4 size-12 object-contain"
                          height={48}
                          src={logo}
                          unoptimized={logo.includes("localhost")}
                          width={48}
                        />
                      ) : (
                        <Building2 className="text-primary-container mb-4 size-10" />
                      )}
                      <h4 className="font-headline text-on-surface text-xl font-bold">
                        {exp.company_name}
                      </h4>
                      <p className="font-headline text-primary-fixed-dim mt-2 text-sm tracking-wide uppercase">
                        {pickLocalized(exp.role_title, locale)}
                      </p>
                    </div>
                    <p className="font-headline text-outline-variant text-xs tracking-widest uppercase">
                      {formatRange(
                        exp.start_date,
                        exp.end_date,
                        locale,
                        present,
                      )}
                    </p>
                  </div>
                  <div className="p-8 md:col-span-9">
                    <ExpandableText
                      lessLabel={lessLabel}
                      moreLabel={moreLabel}
                      text={pickLocalized(exp.description, locale) ?? ""}
                    />
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span
                          className="border-primary bg-surface-container-lowest font-headline text-primary border-l px-3 py-1 text-[10px] tracking-wide uppercase"
                          key={tag.label}
                        >
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
