import { Cloud, Cpu, Database, Globe, Layers, Smartphone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { pickLocalized } from "@/lib/i18n-content";
import type { Locale } from "@/i18n/routing";
import type { StackGroup, Technology } from "@/types/portfolio";
import { cn } from "@/lib/utils";

const iconMap: Record<string, typeof Globe> = {
  frontend: Globe,
  backend: Database,
  cloud: Cloud,
  mobile: Smartphone,
  devops: Layers,
  default: Cpu,
};

export async function StackSection({
  locale,
  groups,
}: {
  locale: Locale;
  groups: { group: StackGroup; technologies: Technology[] }[];
}) {
  const t = await getTranslations();

  return (
    <section className="px-8 py-24 md:px-12 md:py-32 lg:px-16" id="stack">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-end justify-between gap-6 md:mb-16 md:flex-row">
          <div>
            <h2 className="font-headline text-on-surface mb-4 text-4xl font-bold tracking-tighter">
              {t("stack.title")}
            </h2>
            <p className="text-on-surface-variant max-w-md">
              {t("stack.subtitle")}
            </p>
          </div>
          <div className="bg-outline-variant/20 hidden h-px flex-grow md:block" />
          <span className="font-headline text-primary-fixed-dim text-xs tracking-[0.3em] uppercase">
            Core
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {groups.length === 0 ? (
            <p className="text-on-surface-variant md:col-span-4">
              Add stack groups in the admin console.
            </p>
          ) : (
            groups.map(({ group, technologies }) => {
              const Icon = iconMap[group.slug] ?? iconMap.default;
              const isFeatured = group.variant === "featured";
              return (
                <div
                  className={cn(
                    "group bg-surface-container-low hover:bg-surface-container rounded-sm p-8 transition-colors",
                    group.grid_class,
                    isFeatured &&
                      "bg-primary-container text-on-primary hover:bg-primary-container",
                  )}
                  key={group.id}
                >
                  <Icon
                    className={cn(
                      "mb-6 size-8",
                      isFeatured ? "text-on-primary" : "text-primary-fixed-dim",
                    )}
                  />
                  <h3
                    className={cn(
                      "font-headline mb-6 text-2xl font-bold",
                      isFeatured ? "text-on-primary" : "text-on-surface",
                    )}
                  >
                    {pickLocalized(group.title, locale)}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <span
                        className={cn(
                          "font-headline rounded-sm px-3 py-1 text-xs",
                          isFeatured
                            ? "bg-on-primary/10 text-on-primary"
                            : "bg-surface-container-highest text-on-surface-variant",
                        )}
                        key={tech.id}
                      >
                        {tech.name}
                      </span>
                    ))}
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
