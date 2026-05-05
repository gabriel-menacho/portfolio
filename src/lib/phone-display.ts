/** Bolivia (BO) regional indicator pair for display next to phone. */
const BO_FLAG = "\u{1F1E7}\u{1F1F4}";

/** Prefix trimmed phone with the Bolivian flag for UI / resume display. */
export function phoneWithBoliviaFlag(phone: string): string {
  const t = phone.trim();
  if (!t) return "";
  return `${BO_FLAG} ${t}`;
}
