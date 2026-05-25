"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { persistPaletteId } from "@/app/actions/palette-cookie";
import { type PaletteId, PALETTE_IDS } from "@/lib/palette";
import { cn } from "@/lib/utils";

const PALETTE_LABEL_KEYS: Record<
  PaletteId,
  "nameVerdict" | "nameDefault" | "nameEmber" | "nameViolet"
> = {
  verdict: "nameVerdict",
  default: "nameDefault",
  ember: "nameEmber",
  violet: "nameViolet",
};

export function PaletteSelect({ defaultPalette }: { defaultPalette: PaletteId }) {
  const t = useTranslations("palette");
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <select
      aria-label={t("label")}
      className={cn(
        "font-headline border-outline-variant/20 text-primary-fixed-dim hover:border-primary-container hover:text-primary-container bg-surface-container-low max-w-42 cursor-pointer rounded-sm border px-2 py-2 text-xs tracking-wide transition-colors md:max-w-none md:text-sm",
        pending && "opacity-60",
      )}
      disabled={pending}
      onChange={(e) => {
        const next = e.target.value as PaletteId;
        startTransition(async () => {
          await persistPaletteId(next);
          router.refresh();
        });
      }}
      value={defaultPalette}
    >
      {PALETTE_IDS.map((id) => (
        <option key={id} value={id}>
          {t(PALETTE_LABEL_KEYS[id])}
        </option>
      ))}
    </select>
  );
}
