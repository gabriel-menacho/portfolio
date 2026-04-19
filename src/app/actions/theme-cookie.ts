"use server";

import { cookies } from "next/headers";
import { parseThemePreference, THEME_COOKIE } from "@/lib/theme";

export async function persistThemePreference(theme: string) {
  const value = parseThemePreference(theme);
  const store = await cookies();
  store.set(THEME_COOKIE, value, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });
}
