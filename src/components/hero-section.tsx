import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { HeroRoleTypewriter } from "@/components/hero-role-typewriter";
import { ResumeDownloadLink } from "@/components/resume-download-link";
import { pickLocalized } from "@/lib/i18n-content";
import type { Locale } from "@/i18n/routing";
import type { Profile } from "@/types/portfolio";
import { publicObjectUrl } from "@/lib/storage";
import { cn } from "@/lib/utils";

function linesKeyForTypewriter(lines: string[]) {
  return lines.join("\u0000");
}

function mergeHeroHeadlineLines(
  profileHeadline: string,
  rawFromMessages: unknown,
  fallback: string,
): string[] {
  const fromMessages = Array.isArray(rawFromMessages)
    ? rawFromMessages.filter((item): item is string => typeof item === "string")
    : [];
  const trimmed = fromMessages.map((s) => s.trim()).filter(Boolean);
  const primary = profileHeadline.trim();
  const merged: string[] = [];
  const seen = new Set<string>();
  const pushUnique = (value: string) => {
    const key = value.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    merged.push(value);
  };
  if (primary) pushUnique(primary);
  for (const line of trimmed) pushUnique(line);
  if (merged.length === 0) merged.push(fallback);
  return merged;
}

export async function HeroSection({
  profile,
  locale,
  resumePrimaryHref,
}: {
  profile: Profile | null;
  locale: Locale;
  resumePrimaryHref: string;
}) {
  const t = await getTranslations();
  const avatarUrl = publicObjectUrl(profile?.avatar_path ?? null);

  const displayName = pickLocalized(profile?.display_name ?? null, locale);
  const headline = pickLocalized(profile?.headline ?? null, locale);
  const bio = pickLocalized(profile?.bio ?? null, locale);
  const role = pickLocalized(profile?.role_label ?? null, locale);
  const roleFallback = "Software engineer";
  const headlineFallback = t("hero.headlineTypewriterFallback");
  const rawRotating = t.raw("hero.roleRotating");
  const headlineLines = mergeHeroHeadlineLines(
    headline,
    rawRotating,
    headlineFallback,
  );
  const initialHeadlineLine = headlineLines[0] ?? headlineFallback;
  const hasDisplayName = Boolean(displayName?.trim());
  const greeting = t("hero.greeting");

  return (
    <section className="relative flex min-h-[520px] items-center overflow-hidden px-8 pt-28 pb-20 md:min-h-[560px] md:px-12 md:pt-24 lg:px-16">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-12">
        <div className="z-10 md:col-span-7">
          <div className="border-primary-container bg-surface-container-high mb-6 inline-flex items-center gap-2 border-l-2 px-3 py-1">
            <span className="font-headline text-primary-fixed-dim text-xs tracking-[0.25em] uppercase">
              {role || roleFallback}
            </span>
          </div>
          {hasDisplayName ? (
            <>
              <h1 className="font-headline text-on-surface mb-4 text-4xl leading-[1.08] font-bold tracking-tighter md:text-6xl lg:text-7xl">
                <span className="text-on-surface">{greeting} </span>
                <span className="text-primary-container">{displayName}</span>
              </h1>
              <p className="font-headline text-on-surface-variant mb-8 text-2xl leading-tight font-semibold tracking-tight md:text-4xl lg:text-5xl">
                <HeroRoleTypewriter
                  key={linesKeyForTypewriter(headlineLines)}
                  initialText={initialHeadlineLine}
                  lines={headlineLines}
                />
              </p>
            </>
          ) : (
            <h1 className="font-headline text-on-surface mb-8 text-4xl leading-[1.08] font-bold tracking-tighter md:text-6xl lg:text-7xl">
              {headline || headlineFallback}
            </h1>
          )}
          <p className="text-on-surface-variant mb-10 max-w-2xl text-base leading-relaxed md:text-lg">
            {bio ||
              "Configure your profile in the admin area to personalize this introduction."}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <ResumeDownloadLink
              className="bg-primary-container font-headline text-on-primary-container inline-flex items-center gap-2 rounded-sm px-6 py-3 text-sm font-bold transition-transform active:scale-[0.98] md:gap-3 md:px-7 md:py-3.5 md:text-base"
              href={resumePrimaryHref}
              leadingIcon="download"
              leadingIconClassName="size-4 md:size-5"
            >
              {t("hero.resumePrimary")}
            </ResumeDownloadLink>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-xs md:col-span-5 md:mx-0 md:max-w-md">
          <div className="group relative aspect-square overflow-hidden rounded-sm">
            <div className="bg-primary-container/10 absolute inset-0 z-10 mix-blend-overlay" />
            {avatarUrl ? (
              <Image
                alt={displayName || "Profile photo"}
                className="size-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                height={800}
                src={avatarUrl}
                unoptimized={avatarUrl.includes("localhost")}
                width={800}
              />
            ) : (
              <div className="bg-surface-container-low text-on-surface-variant flex size-full items-center justify-center">
                <span className="font-headline text-sm tracking-widest uppercase">
                  Photo
                </span>
              </div>
            )}
            <div
              className={cn(
                "absolute -right-4 -bottom-4 -z-10 h-full w-full rounded-sm",
                "border-primary-container/30 border-r border-b",
              )}
            />
          </div>
        </div>
      </div>
      <div className="bg-primary-container/5 pointer-events-none absolute top-1/4 -right-20 h-96 w-96 rounded-full blur-[120px]" />
      <div className="bg-surface-tint/5 pointer-events-none absolute bottom-1/4 -left-20 h-64 w-64 rounded-full blur-[80px]" />
    </section>
  );
}
