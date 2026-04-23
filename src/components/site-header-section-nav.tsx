"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export type SiteHeaderSectionNavItem = {
  sectionId: string;
  label: string;
};

/** Offset from viewport top (below fixed header) — section is “passed” when its top is at or above this line. */
const SCROLL_SPY_OFFSET_PX = 96;

function pickActiveSectionId(sectionIds: string[]): string | null {
  let current: string | null = null;
  for (const id of sectionIds) {
    const el = document.getElementById(id);
    if (!el) continue;
    const top = el.getBoundingClientRect().top;
    if (top <= SCROLL_SPY_OFFSET_PX) current = id;
  }
  return current;
}

export function SiteHeaderSectionNav({
  items,
}: {
  items: SiteHeaderSectionNavItem[];
}) {
  const idsKey = useMemo(() => items.map((i) => i.sectionId).join(","), [items]);

  const [activeId, setActiveId] = useState<string | null>(null);

  const updateActive = useCallback(() => {
    const ids = idsKey.split(",").filter(Boolean);
    setActiveId(pickActiveSectionId(ids));
  }, [idsKey]);

  useEffect(() => {
    const schedule = () => requestAnimationFrame(() => updateActive());

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
    };
  }, [updateActive]);

  return (
    <div className="font-headline hidden items-center gap-10 text-sm tracking-tight md:flex">
      {items.map(({ sectionId, label }) => {
        const active = activeId === sectionId;
        return (
          <Link
            key={sectionId}
            className={cn(
              "cursor-pointer border-b-2 pb-0.5 transition-colors",
              active
                ? "text-primary-container border-primary-container"
                : "text-on-surface-variant hover:text-primary border-transparent",
            )}
            href={`/#${sectionId}`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
