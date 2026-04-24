import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteOrigin } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const base = siteOrigin();
  const disallow: string[] = [];
  for (const locale of routing.locales) {
    disallow.push(`/${locale}/admin`, `/${locale}/auth`);
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow }],
    sitemap: `${base}/sitemap.xml`,
  };
}
