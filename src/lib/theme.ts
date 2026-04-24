/** HttpOnly-safe cookie name; read in Server Components and written via server action. */
export const THEME_COOKIE = "portfolio-theme";

export type ThemePreference = "light" | "dark" | "system";

export function parseThemePreference(
  value: string | null | undefined,
): ThemePreference {
  if (value === "light" || value === "dark" || value === "system") {
    return value;
  }
  return "system";
}
