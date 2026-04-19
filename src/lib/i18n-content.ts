import type { Locale } from "@/i18n/routing";

export type LocalizedText = Record<Locale, string>;

export function emptyLocalized(): LocalizedText {
  return { en: "", es: "", pt: "" };
}

export function pickLocalized(
  value: LocalizedText | null | undefined,
  locale: Locale,
): string {
  if (!value) return "";
  return value[locale] ?? value.en ?? "";
}

export function parseLocalizedJson(raw: unknown): LocalizedText | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const en = typeof o.en === "string" ? o.en : "";
  const es = typeof o.es === "string" ? o.es : "";
  const pt = typeof o.pt === "string" ? o.pt : "";
  return { en, es, pt };
}
