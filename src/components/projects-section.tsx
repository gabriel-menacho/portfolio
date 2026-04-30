import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { pickLocalized } from "@/lib/i18n-content";
import { locales, type Locale } from "@/i18n/routing";
import type { Project } from "@/types/portfolio";
import { publicObjectUrl } from "@/lib/storage";

function hasLocalePrefix(path: string): boolean {
  return locales.some(
    (locale) => path === `/${locale}` || path.startsWith(`/${locale}/`),
  );
}

function resolveProjectHref(
  rawHref: string,
  locale: Locale,
): { href: string; isExternal: boolean } {
  if (!rawHref.startsWith("/")) {
    return { href: rawHref, isExternal: true };
  }
  if (hasLocalePrefix(rawHref)) {
    return { href: rawHref, isExternal: false };
  }
  return {
    href: rawHref === "/" ? `/${locale}` : `/${locale}${rawHref}`,
    isExternal: false,
  };
}

export async function ProjectsSection({
  locale,
  projects,
}: {
  locale: Locale;
  projects: Project[];
}) {
  const t = await getTranslations();

  return (
    <section className="px-8 py-24 md:px-12 md:py-32 lg:px-16" id="projects">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-headline mb-3 text-4xl font-bold tracking-tighter">
              {t("projects.title")}
            </h2>
            <p className="text-on-surface-variant max-w-xl">
              {t("projects.subtitle")}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.length === 0 ? (
            <p className="text-on-surface-variant md:col-span-2">
              Add projects from the admin console.
            </p>
          ) : (
            projects.map((project) => {
              const img = publicObjectUrl(project.image_path);
              const title = pickLocalized(project.title, locale);
              const desc = pickLocalized(project.description, locale);
              const href = project.url ?? project.repo_url ?? "#";
              const link = resolveProjectHref(href, locale);
              return (
                <article
                  className="bg-surface-container-low hover:bg-surface-container flex flex-col rounded-sm p-8 transition-colors"
                  key={project.id}
                >
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-headline text-2xl font-bold">
                        {title}
                      </h3>
                      <p className="text-on-surface-variant mt-3 text-sm leading-relaxed">
                        {desc}
                      </p>
                    </div>
                    {link.isExternal ? (
                      <a
                        className="bg-surface-container-highest text-primary-fixed-dim hover:bg-primary-container hover:text-on-primary-container inline-flex size-10 shrink-0 items-center justify-center rounded-sm"
                        href={link.href}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <ArrowUpRight className="size-5" />
                      </a>
                    ) : (
                      <Link
                        className="bg-surface-container-highest text-primary-fixed-dim hover:bg-primary-container hover:text-on-primary-container inline-flex size-10 shrink-0 items-center justify-center rounded-sm"
                        href={link.href}
                      >
                        <ArrowUpRight className="size-5" />
                      </Link>
                    )}
                  </div>
                  {img ? (
                    <div className="bg-surface-container-lowest relative mb-6 aspect-video w-full overflow-hidden rounded-sm">
                      <Image
                        alt=""
                        className="object-cover"
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        src={img}
                        unoptimized={img.includes("localhost")}
                      />
                    </div>
                  ) : null}
                  <div className="mt-auto flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        className="bg-surface-container-highest font-headline text-on-surface-variant rounded-sm px-3 py-1 text-[11px]"
                        key={tag.label}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
