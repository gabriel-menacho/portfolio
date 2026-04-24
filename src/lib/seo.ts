import "server-only";

import type { Metadata } from "next";
import { env, getSiteUrl } from "@/lib/env";
import { routing, type Locale } from "@/i18n/routing";
import type { Profile } from "@/types/portfolio";
import { pickLocalized } from "@/lib/i18n-content";
import { publicObjectUrl } from "@/lib/storage";

/** Fallback when profile display name is missing (matches public domain branding). */
export const DEFAULT_SITE_BRAND_NAME = "Gabriel Menacho";

export function siteOrigin(): string {
  return getSiteUrl().replace(/\/$/, "");
}

export function absoluteUrl(path: string): string {
  const origin = siteOrigin();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${p}`;
}

/** hreflang map for the localized homepage (`/{locale}`). */
export function homepageLanguageAlternates(): Record<string, string> {
  const base = siteOrigin();
  const map: Record<string, string> = {};
  for (const locale of routing.locales) {
    map[locale] = `${base}/${locale}`;
  }
  map["x-default"] = `${base}/${routing.defaultLocale}`;
  return map;
}

export function homepageCanonical(locale: Locale): string {
  return absoluteUrl(`/${locale}`);
}

const ogLocaleByPageLocale: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
  pt: "pt_BR",
};

export function openGraphLocales(
  pageLocale: Locale,
): { locale: string; alternateLocale: string[] } {
  const others = routing.locales.filter((l) => l !== pageLocale);
  return {
    locale: ogLocaleByPageLocale[pageLocale],
    alternateLocale: others.map((l) => ogLocaleByPageLocale[l]),
  };
}

export function siteBrandName(
  profile: Profile | null,
  locale: Locale,
): string {
  const fromProfile = pickLocalized(profile?.display_name ?? null, locale);
  return fromProfile.trim() || DEFAULT_SITE_BRAND_NAME;
}

/** Safe inside `<script type="application/ld+json">`. */
export function jsonLdStringify(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function schemaInLanguage(locale: Locale): string {
  return ogLocaleByPageLocale[locale].replace("_", "-");
}

function sameAsFromProfile(profile: Profile | null): string[] {
  if (!profile) return [];
  const out: string[] = [];
  for (const raw of [profile.social_github, profile.social_linkedin]) {
    const u = raw?.trim();
    if (u && /^https?:\/\//i.test(u)) out.push(u);
  }
  return out;
}

export function buildHomeJsonLd(params: {
  profile: Profile | null;
  locale: Locale;
}): Record<string, unknown> {
  const { profile, locale } = params;
  const pageUrl = homepageCanonical(locale);
  const name =
    pickLocalized(profile?.display_name ?? null, locale).trim() ||
    DEFAULT_SITE_BRAND_NAME;
  const headline = pickLocalized(profile?.headline ?? null, locale).trim();
  const bio = pickLocalized(profile?.bio ?? null, locale).trim();
  const jobTitle = headline || undefined;
  const description = bio || headline || undefined;
  const image = publicObjectUrl(profile?.avatar_path ?? null) ?? undefined;
  const sameAs = sameAsFromProfile(profile);
  const siteName = siteBrandName(profile, locale);

  const person: Record<string, unknown> = {
    "@type": "Person",
    name,
    url: pageUrl,
  };
  if (jobTitle) person.jobTitle = jobTitle;
  if (description) person.description = description;
  if (image) person.image = image;
  if (sameAs.length) person.sameAs = sameAs;

  const website: Record<string, unknown> = {
    "@type": "WebSite",
    name: siteName,
    url: pageUrl,
    inLanguage: schemaInLanguage(locale),
    description: description ?? `${name} — portfolio`,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [website, person],
  };
}

/** Search engine HTML verification tags (values from Search Console / Bing Webmaster). */
export function searchVerificationMetadata(): Metadata["verification"] | undefined {
  const google = env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
  const bing = env.NEXT_PUBLIC_BING_SITE_VERIFICATION?.trim();
  if (!google && !bing) return undefined;
  const other: Record<string, string> = {};
  if (bing) other["msvalidate.01"] = bing;
  return {
    ...(google ? { google } : {}),
    ...(Object.keys(other).length ? { other } : {}),
  };
}
