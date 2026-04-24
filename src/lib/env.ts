import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.preprocess(
    (v) => (v === undefined || v === "" ? "http://localhost:54321" : v),
    z.string().url(),
  ),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.preprocess(
    (v) => (v === undefined || v === "" ? "public-anon-key" : v),
    z.string().min(1),
  ),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  /** Google Search Console HTML tag verification (content value only). */
  NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: z.string().optional(),
  /** Bing Webmaster msvalidate.01 content value. */
  NEXT_PUBLIC_BING_SITE_VERIFICATION: z.string().optional(),
  ALLOWED_GITHUB_IDS: z
    .string()
    .optional()
    .transform((s) =>
      s
        ? s
            .split(",")
            .map((id) => id.trim())
            .filter(Boolean)
        : [],
    ),
});

export type Env = z.infer<typeof envSchema>;

function parseEnv(): Env {
  return envSchema.parse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    NEXT_PUBLIC_BING_SITE_VERIFICATION:
      process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
    ALLOWED_GITHUB_IDS: process.env.ALLOWED_GITHUB_IDS,
  });
}

export const env = parseEnv();

export function getSiteUrl(): string {
  if (env.NEXT_PUBLIC_SITE_URL) return env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}
