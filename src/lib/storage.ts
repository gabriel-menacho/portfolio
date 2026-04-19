import { env } from "@/lib/env";

/** `bucket/path/to/file` */
export function publicObjectUrl(path: string | null | undefined) {
  if (!path) return null;
  const base = env.NEXT_PUBLIC_SUPABASE_URL.replace(/\/$/, "");
  return `${base}/storage/v1/object/public/${path}`;
}
