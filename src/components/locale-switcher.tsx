"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { type Locale, routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/** Flip to `true` when every locale’s copy is ready to ship. */
const LOCALE_SWITCHER_ENABLED = false;

function languageOptionLabel(code: string): string {
  try {
    return new Intl.DisplayNames([code], { type: "language" }).of(code) ?? code;
  } catch {
    return code;
  }
}

export function LocaleSwitcher({ className }: { className?: string }) {
  if (!LOCALE_SWITCHER_ENABLED) {
    return null;
  }

  return <LocaleSwitcherImpl className={className} />;
}

function LocaleSwitcherImpl({ className }: { className?: string }) {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onDocMouseDown = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-flex shrink-0 items-center", className)}
    >
      <span id="site-locale-label" className="sr-only">
        {t("language")}
      </span>
      <button
        type="button"
        id="site-locale-trigger"
        aria-labelledby="site-locale-label"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="site-locale-listbox"
        className={cn(
          "font-headline border-outline-variant/20 text-primary-fixed-dim hover:border-primary-container hover:text-primary-container",
          "inline-flex h-10 min-w-14 cursor-pointer items-center justify-center gap-1 rounded-sm border bg-transparent px-2.5 text-xs font-semibold tracking-widest transition-colors",
          "focus-visible:ring-primary-container outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        )}
        onClick={() => setOpen((v) => !v)}
      >
        {locale.toUpperCase()}
        <ChevronDown
          aria-hidden
          className={cn("size-4 shrink-0 transition-transform", open && "rotate-180")}
        />
      </button>
      {open ? (
        <ul
          id="site-locale-listbox"
          role="listbox"
          aria-labelledby="site-locale-label"
          className={cn(
            "border-outline-variant/20 absolute right-0 z-50 mt-1 min-w-40 rounded-sm border py-1 shadow-lg",
            "bg-surface-container text-on-surface font-headline text-sm tracking-tight",
          )}
        >
          {routing.locales.map((l) => {
            const selected = l === locale;
            return (
              <li key={l} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  className={cn(
                    "cursor-pointer hover:bg-surface-container-high w-full px-3 py-2 text-left transition-colors",
                    selected && "bg-surface-container-high text-primary-container",
                  )}
                  onClick={() => {
                    router.replace(pathname, { locale: l });
                    setOpen(false);
                  }}
                >
                  {languageOptionLabel(l)}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
