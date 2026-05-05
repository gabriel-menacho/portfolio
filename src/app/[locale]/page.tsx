import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactSection } from "@/components/contact-section";
import { ExperienceSection } from "@/components/experience-section";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SocialSidebar } from "@/components/social-sidebar";
import { StackSection } from "@/components/stack-section";
import {
  getExperiences,
  getProfile,
  getProjects,
  getStack,
} from "@/lib/data/portfolio";
import { showHomeProjectsSection } from "@/lib/site-flags";
import { pickLocalized } from "@/lib/i18n-content";
import type { Locale } from "@/i18n/routing";
import {
  buildHomeJsonLd,
  homepageCanonical,
  homepageLanguageAlternates,
  jsonLdStringify,
  openGraphLocales,
  siteBrandName,
} from "@/lib/seo";
import { publicObjectUrl } from "@/lib/storage";
import { cn } from "@/lib/utils";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ showAdmin?: string | string[] }>;
};

function wantsShowAdminLink(raw: string | string[] | undefined): boolean {
  const v = Array.isArray(raw) ? raw[0] : raw;
  if (v === undefined) return false;
  const n = v.trim().toLowerCase();
  return n !== "0" && n !== "false" && n !== "no";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const profile = await getProfile();
  const title =
    pickLocalized(profile?.display_name ?? null, loc).trim() || "Portfolio";
  const description =
    pickLocalized(profile?.headline ?? null, loc) ||
    pickLocalized(profile?.bio ?? null, loc) ||
    `${siteBrandName(profile, loc)} — portfolio`;
  const pageUrl = homepageCanonical(loc);
  const languages = homepageLanguageAlternates();
  const ogLocales = openGraphLocales(loc);
  const siteName = siteBrandName(profile, loc);
  const avatarUrl = publicObjectUrl(profile?.avatar_path ?? null);

  return {
    title,
    description,
    alternates: { canonical: pageUrl, languages },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url: pageUrl,
      title,
      description,
      siteName,
      locale: ogLocales.locale,
      alternateLocale: ogLocales.alternateLocale,
      ...(avatarUrl
        ? { images: [{ url: avatarUrl, alt: title }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(avatarUrl ? { images: [avatarUrl] } : {}),
    },
  };
}

export default async function HomePage({ params, searchParams }: Props) {
  const { locale } = await params;
  const sp = await searchParams;
  const showAdminLink = wantsShowAdminLink(sp.showAdmin);
  const loc = locale as Locale;
  const t = await getTranslations();

  const [profile, stack, experiences] = await Promise.all([
    getProfile(),
    getStack(),
    getExperiences({ publicOnly: true }),
  ]);
  const projects = showHomeProjectsSection
    ? await getProjects({ publicOnly: true })
    : [];

  const overrideUrl = publicObjectUrl(profile?.resume_override_path ?? null);
  const generatedUrl = `/api/resume/pdf?locale=${loc}`;
  const resumePrimaryHref = overrideUrl ?? generatedUrl;
  const showSocialRail = Boolean(
    profile?.email?.trim() ||
      profile?.phone?.trim() ||
      profile?.social_github ||
      profile?.social_linkedin,
  );

  const jsonLd = buildHomeJsonLd({ profile, locale: loc });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdStringify(jsonLd) }}
      />
      <SiteHeader
        resumePrimaryHref={resumePrimaryHref}
        showAdminLink={showAdminLink}
      />
      <SocialSidebar profile={profile} />
      <div className={cn(showSocialRail && "sm:pl-12 md:pl-14")}>
        <main className="pt-20">
          <HeroSection
            locale={loc}
            profile={profile}
            resumePrimaryHref={resumePrimaryHref}
          />
          <StackSection groups={stack} locale={loc} />
          <ExperienceSection experiences={experiences} locale={loc} />
          {showHomeProjectsSection ? (
            <ProjectsSection locale={loc} projects={projects} />
          ) : null}
          <ContactSection
            locale={loc}
            panelNote={t("contact.panel")}
            profile={profile}
          />
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
