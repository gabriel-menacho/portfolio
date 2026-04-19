import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const repoRoot = path.dirname(fileURLToPath(import.meta.url));

function supabaseHost() {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!raw) return "localhost";
  try {
    return new URL(raw).hostname;
  } catch {
    return "localhost";
  }
}

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  turbopack: {
    root: repoRoot,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: supabaseHost(),
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
