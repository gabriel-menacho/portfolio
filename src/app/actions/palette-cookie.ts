"use server";

import { cookies } from "next/headers";
import { PALETTE_COOKIE, parsePaletteId } from "@/lib/palette";

export async function persistPaletteId(palette: string) {
  const value = parsePaletteId(palette);
  const store = await cookies();
  store.set(PALETTE_COOKIE, value, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });
}
