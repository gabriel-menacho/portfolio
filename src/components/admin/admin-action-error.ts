type FormErrorLabels = {
  generic: string;
  permission: string;
  validation: string;
  session: string;
};

/**
 * Maps thrown values (e.g. Supabase errors) to localized admin copy.
 * Heuristics mirror server-side mapProfileActionError in admin/actions.ts.
 */
export function mapAdminThrownError(
  e: unknown,
  labels: FormErrorLabels,
): string {
  if (e instanceof Error && e.message.trim()) {
    const mapped = mapFromMessageAndCode(e.message, "", labels);
    if (mapped) return mapped;
    return e.message;
  }
  if (!e || typeof e !== "object") return labels.generic;
  const rec = e as Record<string, unknown>;
  const message =
    typeof rec.message === "string" ? rec.message.toLowerCase() : "";
  const code = typeof rec.code === "string" ? rec.code : "";
  return mapFromMessageAndCode(message, code, labels) ?? labels.generic;
}

function mapFromMessageAndCode(
  message: string,
  code: string,
  labels: FormErrorLabels,
): string | null {
  if (
    code === "42501" ||
    message.includes("permission denied") ||
    message.includes("row-level security")
  ) {
    return labels.permission;
  }
  if (
    code.startsWith("22") ||
    code === "23502" ||
    code === "23514" ||
    message.includes("violates check constraint")
  ) {
    return labels.validation;
  }
  if (
    message.includes("jwt") ||
    message.includes("not authenticated") ||
    message.includes("invalid login")
  ) {
    return labels.session;
  }
  if (message) return null;
  return labels.generic;
}
