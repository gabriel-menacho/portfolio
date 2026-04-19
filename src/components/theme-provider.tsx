"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { parseThemePreference, type ThemePreference } from "@/lib/theme";

type ThemeContextValue = {
  resolvedTheme: "light" | "dark";
  setTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext);
  if (!value) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return value;
}

function subscribePreferredColorScheme(cb: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getPreferredColorScheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({
  children,
  defaultTheme,
}: {
  children: ReactNode;
  /** From server (cookie via middleware header); keeps SSR and client aligned. */
  defaultTheme: ThemePreference;
}) {
  const [preference, setPreference] =
    useState<ThemePreference>(defaultTheme);

  const systemResolved = useSyncExternalStore(
    subscribePreferredColorScheme,
    getPreferredColorScheme,
    () => "light",
  );

  const resolvedTheme: "light" | "dark" = useMemo(() => {
    if (preference === "system") {
      return systemResolved === "dark" ? "dark" : "light";
    }
    if (preference === "light" || preference === "dark") return preference;
    return "light";
  }, [preference, systemResolved]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(resolvedTheme);
  }, [resolvedTheme]);

  const setTheme = useCallback((theme: string) => {
    setPreference(parseThemePreference(theme));
  }, []);

  const value = useMemo(
    (): ThemeContextValue => ({ resolvedTheme, setTheme }),
    [resolvedTheme, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
