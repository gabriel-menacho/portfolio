"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export type AdminSnackbarVariant = "success" | "error";

type SnackbarPayload = {
  variant: AdminSnackbarVariant;
  message: string;
};

type AdminSnackbarContextValue = {
  showSnackbar: (payload: SnackbarPayload) => void;
};

const AdminSnackbarContext = createContext<AdminSnackbarContextValue | null>(
  null,
);

const DISMISS_MS = 5000;

export function useAdminSnackbar() {
  const ctx = useContext(AdminSnackbarContext);
  if (!ctx) {
    throw new Error("useAdminSnackbar must be used within AdminSnackbarProvider");
  }
  return ctx;
}

export function AdminSnackbarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<SnackbarPayload | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const liveId = useId();

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const showSnackbar = useCallback(
    (payload: SnackbarPayload) => {
      clearTimer();
      setOpen(payload);
      timeoutRef.current = setTimeout(() => {
        setOpen(null);
        timeoutRef.current = null;
      }, DISMISS_MS);
    },
    [clearTimer],
  );

  useEffect(() => () => clearTimer(), [clearTimer]);

  const dismiss = useCallback(() => {
    clearTimer();
    setOpen(null);
  }, [clearTimer]);

  return (
    <AdminSnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {open ? (
        <div
          aria-labelledby={liveId}
          className="pointer-events-none fixed inset-x-0 bottom-6 z-[100] flex justify-center px-4"
          role="presentation"
        >
          <div
            aria-live={open.variant === "error" ? "assertive" : "polite"}
            className={cn(
              "pointer-events-auto font-headline max-w-md min-w-[min(100%,17rem)] rounded-md border-2 px-5 py-4 text-base font-semibold leading-snug shadow-2xl ring-2 motion-safe:animate-[admin-snackbar-in_380ms_cubic-bezier(0.22,1,0.36,1)_both]",
              open.variant === "success" &&
                "border-primary-container bg-surface-container-highest text-on-surface shadow-primary-container/35 ring-primary-fixed-dim/55",
              open.variant === "error" &&
                "border-red-500 bg-red-500/25 text-red-950 shadow-red-600/25 ring-red-400/70 dark:bg-red-500/30 dark:text-red-50 dark:ring-red-400/50",
            )}
            id={liveId}
            role="status"
          >
            <div className="flex items-start gap-3">
              <p className="min-w-0 flex-1 leading-snug">{open.message}</p>
              <button
                className="cursor-pointer text-on-surface-variant hover:text-on-surface shrink-0 text-xs tracking-widest uppercase"
                onClick={dismiss}
                type="button"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </AdminSnackbarContext.Provider>
  );
}
