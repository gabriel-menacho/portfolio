import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";
import { Shield } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { HireMeButton } from "@/components/hire-me-button";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { PaletteSelect } from "@/components/palette-select";
import { ResumeDownloadLink } from "@/components/resume-download-link";
import { SiteHeaderSectionNav } from "@/components/site-header-section-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { PALETTE_COOKIE, parsePaletteId } from "@/lib/palette";
import { showHomeProjectsSection } from "@/lib/site-flags";
import { cn } from "@/lib/utils";

export async function SiteHeader({
  resumePrimaryHref,
  showAdminLink,
}: {
  resumePrimaryHref: string;
  showAdminLink?: boolean;
}) {
  const t = await getTranslations();
  const palette = parsePaletteId(
    (await cookies()).get(PALETTE_COOKIE)?.value,
  );

  const sectionNavItems = [
    { sectionId: "stack", label: t("nav.stack") },
    { sectionId: "experience", label: t("nav.experience") },
    ...(showHomeProjectsSection
      ? [{ sectionId: "projects" as const, label: t("nav.projects") }]
      : []),
    { sectionId: "contact", label: t("nav.contact") },
  ];

  return (
    <nav
      className={cn(
        "glass-nav nav-elevated border-outline-variant/15 fixed top-0 z-50 w-full border-b",
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-8 md:px-12 lg:px-16">
        <Link
          className="cursor-pointer font-headline text-primary-container text-lg font-bold tracking-tighter md:text-xl"
          href="/"
        >
          PORTFOLIO
        </Link>
        <SiteHeaderSectionNav items={sectionNavItems} />
        <div className="flex items-center gap-3">
          <PaletteSelect defaultPalette={palette} />
          <ThemeToggle
            labelDark={t("theme.toDark")}
            labelLight={t("theme.toLight")}
          />
          <LocaleSwitcher />
          <HireMeButton variant="header" />
          <ResumeDownloadLink
            className="cursor-pointer bg-primary-container font-headline text-on-primary-container hidden items-center gap-2 rounded-sm px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-90 md:inline-flex"
            href={resumePrimaryHref}
            leadingIcon="download"
            leadingIconClassName="size-4"
          >
            {t("hero.resumePrimary")}
          </ResumeDownloadLink>
          {showAdminLink ? (
            <Link
              className="cursor-pointer border-outline-variant/20 text-primary-fixed-dim hover:border-primary-container hover:text-primary-container inline-flex size-10 items-center justify-center rounded-sm border"
              href="/admin"
              title={t("nav.admin")}
            >
              <Shield className="size-5" />
            </Link>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
