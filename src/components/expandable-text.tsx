"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const LINE_CLAMP: Record<3 | 4 | 5 | 6, string> = {
  3: "line-clamp-3",
  4: "line-clamp-4",
  5: "line-clamp-5",
  6: "line-clamp-6",
};

type ExpandableTextProps = {
  text: string;
  moreLabel: string;
  lessLabel: string;
  collapsedLines?: 3 | 4 | 5 | 6;
};

export function ExpandableText({
  text,
  moreLabel,
  lessLabel,
  collapsedLines = 4,
}: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  const [needsToggle, setNeedsToggle] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el || !text.trim()) {
      setNeedsToggle(false);
      return;
    }
    if (expanded) {
      return;
    }
    const truncated = el.scrollHeight > el.clientHeight + 1;
    setNeedsToggle(truncated);
  }, [text, expanded, collapsedLines]);

  useLayoutEffect(() => {
    const handler = () => {
      const el = textRef.current;
      if (!el || !text.trim() || expanded) return;
      setNeedsToggle(el.scrollHeight > el.clientHeight + 1);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [text, expanded]);

  if (!text.trim()) {
    return null;
  }

  return (
    <div className="mb-8">
      <p
        className={cn(
          "text-on-surface-variant leading-relaxed",
          !expanded && LINE_CLAMP[collapsedLines],
        )}
        ref={textRef}
      >
        {text}
      </p>
      {needsToggle ? (
        <button
          aria-expanded={expanded}
          className="font-headline text-primary-container hover:text-primary mt-3 text-sm font-semibold tracking-wide underline-offset-4 hover:underline"
          onClick={() => setExpanded((v) => !v)}
          type="button"
        >
          {expanded ? lessLabel : moreLabel}
        </button>
      ) : null}
    </div>
  );
}
