"use client";

import { Briefcase } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLayoutEffect, useRef, useState } from "react";
import { HireMeDialog } from "@/components/hire-me-dialog";
import { cn } from "@/lib/utils";

const PANEL_EASE_IN = "cubic-bezier(0.32, 0.72, 0, 1)";
const PANEL_EASE_OUT = "cubic-bezier(0.4, 0, 1, 1)";
const PANEL_MS = 380;

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function clearPanelMotion(panel: HTMLDivElement | null) {
  if (!panel) return;
  panel.style.transition = "";
  panel.style.transform = "";
}

function playDrawerOpen(panel: HTMLDivElement | null) {
  if (!panel) return;
  if (prefersReducedMotion()) {
    clearPanelMotion(panel);
    return;
  }
  panel.style.transition = "none";
  panel.style.transform = "translate3d(100%, 0, 0)";
  void panel.offsetHeight;
  panel.style.transition = `transform ${PANEL_MS}ms ${PANEL_EASE_IN}`;
  requestAnimationFrame(() => {
    panel.style.transform = "translate3d(0, 0, 0)";
  });
}

function playDrawerClose(panel: HTMLDivElement | null, onDone: () => void) {
  if (!panel) {
    onDone();
    return;
  }
  if (prefersReducedMotion()) {
    onDone();
    return;
  }
  panel.style.transition = `transform ${PANEL_MS}ms ${PANEL_EASE_OUT}`;
  panel.style.transform = "translate3d(100%, 0, 0)";

  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    panel.removeEventListener("transitionend", onEnd);
    onDone();
  };

  const onEnd = (e: TransitionEvent) => {
    if (e.target !== panel || e.propertyName !== "transform") return;
    finish();
  };

  panel.addEventListener("transitionend", onEnd);
  window.setTimeout(finish, PANEL_MS + 60);
}

export function HireMeButton({ variant }: { variant: "hero" | "header" }) {
  const t = useTranslations();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  useLayoutEffect(() => {
    const el = dialogRef.current;
    const panel = panelRef.current;
    if (!drawerOpen) {
      if (el?.open) el.close();
      return;
    }
    if (!el) return;
    if (!el.open) el.showModal();
    playDrawerOpen(panel);
  }, [drawerOpen]);

  const openDrawer = () => {
    closingRef.current = false;
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    if (closingRef.current) return;
    const dialogEl = dialogRef.current;
    const panel = panelRef.current;
    if (!dialogEl?.open) return;

    if (prefersReducedMotion()) {
      dialogEl.close();
      return;
    }

    closingRef.current = true;
    playDrawerClose(panel, () => {
      closingRef.current = false;
      dialogEl.close();
    });
  };

  return (
    <>
      <button
        className={cn(
          "font-headline inline-flex cursor-pointer items-center gap-2 rounded-sm border transition-colors motion-reduce:transition-none",
          variant === "hero" &&
            "border-outline-variant/20 text-on-surface hover:border-primary-container hover:text-primary-container px-6 py-3 text-sm font-bold active:scale-[0.98] md:gap-3 md:px-7 md:py-3.5 md:text-base motion-reduce:active:scale-100",
          variant === "header" &&
            "border-outline-variant/20 text-primary-fixed-dim hover:border-primary-container hover:text-primary-container hidden px-4 py-2 text-sm font-semibold md:inline-flex",
        )}
        onClick={openDrawer}
        type="button"
      >
        <Briefcase
          className={cn(variant === "hero" ? "size-4 md:size-5" : "size-4")}
        />
        {t("hire.cta")}
      </button>

      <dialog
        aria-labelledby="hire-dialog-title"
        className={cn(
          drawerOpen
            ? "text-on-surface fixed inset-0 z-[100] m-0 flex h-[100dvh] max-h-[100dvh] w-full max-w-none cursor-default flex-col border-0 bg-transparent p-0 outline-none [&::backdrop]:bg-black/55"
            : "hidden",
        )}
        onCancel={(e) => {
          e.preventDefault();
          closeDrawer();
        }}
        onClose={() => {
          clearPanelMotion(panelRef.current);
          setDrawerOpen(false);
          closingRef.current = false;
        }}
        ref={dialogRef}
      >
        <div
          className="flex min-h-0 flex-1 flex-row justify-end bg-transparent"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeDrawer();
          }}
          role="presentation"
        >
          <div
            className={cn(
              "bg-surface text-on-surface flex h-full min-h-0 w-full max-w-[min(100vw,42rem)] flex-col overflow-hidden border-outline-variant/20 shadow-2xl sm:border-l sm:border-outline-variant/20",
              "translate-z-0 backface-hidden will-change-transform",
            )}
            onClick={(e) => e.stopPropagation()}
            ref={panelRef}
          >
            <HireMeDialog onRequestClose={closeDrawer} />
          </div>
        </div>
      </dialog>
    </>
  );
}
