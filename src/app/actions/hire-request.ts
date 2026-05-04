"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";
import type { ZodError } from "zod";
import { hireRequestInputSchema } from "@/lib/hire-request-schema";
import { createClient } from "@/lib/supabase/server";

export type CreateHireRequestResult =
  | { ok: true }
  | {
      ok: false;
      error?: string;
      fieldErrors?: Record<string, string>;
    };

function mapSupabaseHireError(
  e: unknown,
  t: Awaited<ReturnType<typeof getTranslations>>,
): string {
  const fallback = t("hire.errors.generic");
  if (!e || typeof e !== "object") return fallback;
  const rec = e as Record<string, unknown>;
  const message =
    typeof rec.message === "string" ? rec.message.toLowerCase() : "";
  const code = typeof rec.code === "string" ? rec.code : "";

  if (
    code === "42501" ||
    message.includes("permission denied") ||
    message.includes("row-level security")
  ) {
    return t("hire.errors.generic");
  }
  if (
    code.startsWith("22") ||
    code === "23502" ||
    code === "23514" ||
    message.includes("violates check constraint")
  ) {
    return t("hire.errors.validation");
  }
  return fallback;
}

function zodFieldErrors(
  err: ZodError,
  t: Awaited<ReturnType<typeof getTranslations>>,
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const path = issue.path[0];
    if (typeof path !== "string") continue;
    if (out[path]) continue;
    const code = String(issue.code);
    if (code === "too_small" || code === "invalid_type")
      out[path] = t("hire.errors.required");
    else if (code === "too_big") out[path] = t("hire.errors.tooLong");
    else if (
      path === "recruiterEmail" &&
      (code.includes("invalid") ||
        code === "invalid_format" ||
        code === "invalid_string")
    )
      out[path] = t("hire.errors.email");
    else if (code === "invalid_enum_value" || code === "invalid_value")
      out[path] = t("hire.errors.required");
    else out[path] = t("hire.errors.generic");
  }
  return out;
}

export async function createHireRequest(
  raw: unknown,
): Promise<CreateHireRequestResult> {
  const parsed = hireRequestInputSchema.safeParse(raw);
  const locale = typeof raw === "object" && raw !== null && "locale" in raw
    ? String((raw as { locale?: unknown }).locale ?? "en")
    : "en";
  const t = await getTranslations({ locale });

  if (!parsed.success) {
    return {
      ok: false,
      fieldErrors: zodFieldErrors(parsed.error, t),
    };
  }

  const v = parsed.data;
  const supabase = await createClient();
  const h = await headers();
  const userAgent = h.get("user-agent")?.slice(0, 2000) ?? null;

  const { error } = await supabase.from("hire_requests").insert({
    recruiter_email: v.recruiterEmail,
    recruiter_name: v.recruiterName ?? null,
    company: v.company ?? null,
    job_title: v.jobTitle,
    employment_type: v.employmentType,
    job_location: v.jobLocation ?? null,
    is_remote: v.isRemote,
    salary_range: v.salaryRange ?? null,
    job_description: v.jobDescription,
    message: v.message ?? null,
    locale: v.locale,
    user_agent: userAgent,
  });

  if (error) {
    return { ok: false, error: mapSupabaseHireError(error, t) };
  }

  revalidatePath(`/${v.locale}/admin/hire-requests`);
  return { ok: true };
}

export async function deleteHireRequest(formData: FormData) {
  const locale = String(formData.get("locale") ?? "en");
  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;

  const supabase = await createClient();
  const { error } = await supabase.from("hire_requests").delete().eq("id", id);
  if (error) throw error;

  revalidatePath(`/${locale}/admin/hire-requests`);
}
