"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const TYPE_MS = 45;
const DELETE_MS = 28;
const PAUSE_FULL_MS = 1000;
const PAUSE_BETWEEN_MS = 400;

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}

export function HeroRoleTypewriter({
  lines,
  initialText,
  className,
}: {
  lines: string[];
  initialText: string;
  className?: string;
}) {
  const linesKey = JSON.stringify(lines);
  const normalized = useMemo((): string[] => {
    try {
      const parsed: unknown = JSON.parse(linesKey);
      if (!Array.isArray(parsed)) return [];
      return parsed
        .filter((item): item is string => typeof item === "string")
        .map((s) => s.trim())
        .filter(Boolean);
    } catch {
      return [];
    }
  }, [linesKey]);
  const reduceMotion = usePrefersReducedMotion();
  const [text, setText] = useState(initialText);

  useEffect(() => {
    if (reduceMotion || normalized.length < 2) return;

    /** Per-effect flag so Strict Mode / remount cannot resurrect a stale loop via a shared ref reset. */
    let cancelled = false;

    void (async () => {
      let i = 0;
      while (!cancelled) {
        const target = normalized[i % normalized.length] ?? "";
        setText(target);
        await delay(PAUSE_FULL_MS);
        if (cancelled) return;

        for (let len = target.length; len > 0; len--) {
          if (cancelled) return;
          setText(target.slice(0, len - 1));
          await delay(DELETE_MS);
        }
        if (cancelled) return;
        await delay(PAUSE_BETWEEN_MS);
        if (cancelled) return;

        i += 1;
        const next = normalized[i % normalized.length] ?? "";
        for (let len = 1; len <= next.length; len++) {
          if (cancelled) return;
          setText(next.slice(0, len));
          await delay(TYPE_MS);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [reduceMotion, normalized, initialText]);

  const display = normalized[0] ?? initialText;
  const showStatic = reduceMotion || normalized.length < 2;
  const visibleText = showStatic ? display : text;

  return (
    <span
      className={cn(
        "inline-block w-full max-w-full min-h-[1lh] align-middle",
        className,
      )}
    >
      <span
        className={cn(
          "flex min-h-[1lh] w-full min-w-0 items-center gap-1.5 whitespace-nowrap",
          "overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        <span
          aria-atomic="true"
          aria-live="polite"
          className="min-w-0 shrink-0"
          role="status"
        >
          {visibleText}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "inline-block w-0.5 shrink-0 rounded-[1px] bg-primary-fixed-dim",
            "h-[1em] self-center",
            "motion-safe:animate-pulse motion-reduce:opacity-90",
          )}
        />
      </span>
    </span>
  );
}
