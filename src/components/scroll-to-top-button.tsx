"use client";

import { ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD_PX = 200;

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ScrollToTopButton() {
  const t = useTranslations("nav");
  const [visible, setVisible] = useState(false);

  const syncVisibility = useCallback(() => {
    setVisible(window.scrollY > SCROLL_THRESHOLD_PX);
  }, []);

  useEffect(() => {
    const schedule = () => requestAnimationFrame(() => syncVisibility());

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [syncVisibility]);

  return (
    <button
      aria-label={t("scrollToTop")}
      className={cn(
        "border-outline-variant/20 text-primary-fixed-dim hover:border-primary-container hover:text-primary-container fixed right-6 bottom-6 z-40 inline-flex size-10 items-center justify-center rounded-sm border transition-opacity",
        visible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion() ? "auto" : "smooth",
        });
      }}
      type="button"
    >
      <ChevronUp className="size-5" aria-hidden />
    </button>
  );
}
