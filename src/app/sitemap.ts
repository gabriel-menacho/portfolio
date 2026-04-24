import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { homepageLanguageAlternates } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = homepageLanguageAlternates();
  return routing.locales.map((locale) => ({
    url: languages[locale]!,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: { languages },
  }));
}
