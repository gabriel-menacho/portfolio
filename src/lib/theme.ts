/** HttpOnly-safe cookie name; read in middleware and written via server action. */
export const THEME_COOKIE = "portfolio-theme";

/** Request header set by middleware so Server Components can read the resolved preference. */
export const THEME_HEADER = "x-portfolio-theme";

export type ThemePreference = "light" | "dark" | "system";

export function parseThemePreference(
  value: string | null | undefined,
): ThemePreference {
  if (value === "light" || value === "dark" || value === "system") {
    return value;
  }
  return "system";
}
