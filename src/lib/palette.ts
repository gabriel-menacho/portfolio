/** HttpOnly-safe cookie; read in Server Components and written via server action. */
export const PALETTE_COOKIE = "portfolio-palette";

/** Ember Forge first (site default); Binary Architect and Violet follow. */
export const PALETTE_IDS = ["ember", "default", "violet"] as const;

export type PaletteId = (typeof PALETTE_IDS)[number];

export function parsePaletteId(
  value: string | null | undefined,
): PaletteId {
  if (value === "default" || value === "ember" || value === "violet") {
    return value;
  }
  return "ember";
}
