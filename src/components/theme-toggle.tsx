"use client";

import { persistThemePreference } from "@/app/actions/theme-cookie";
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const emptySubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export function ThemeToggle({
  labelLight,
  labelDark,
}: {
  labelLight: string;
  labelDark: string;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const router = useRouter();
  const mounted = useIsClient();

  if (!mounted) {
    return (
      <span
        aria-hidden
        className="border-outline-variant/20 inline-flex size-10 shrink-0 rounded-sm border"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      aria-label={isDark ? labelLight : labelDark}
      className={cn(
        "border-outline-variant/20 inline-flex size-10 shrink-0 items-center justify-center rounded-sm border",
        "text-primary-fixed-dim hover:border-primary-container hover:text-primary-container transition-colors",
      )}
      onClick={() => {
        const next = isDark ? "light" : "dark";
        setTheme(next);
        void (async () => {
          await persistThemePreference(next);
          router.refresh();
        })();
      }}
      type="button"
    >
      {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </button>
  );
}
