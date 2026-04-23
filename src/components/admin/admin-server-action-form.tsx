"use client";

import { useTranslations } from "next-intl";
import { useFormStatus } from "react-dom";
import type { ReactNode } from "react";
import { mapAdminThrownError } from "@/components/admin/admin-action-error";
import { useAdminSnackbar } from "@/components/admin/admin-snackbar";
import { cn } from "@/lib/utils";

type ServerAction = (formData: FormData) => Promise<void>;

export function AdminServerActionForm({
  action,
  successMessage,
  children,
}: {
  action: ServerAction;
  successMessage: string;
  children: ReactNode;
}) {
  const { showSnackbar } = useAdminSnackbar();
  const tErrors = useTranslations("admin.formErrors");

  async function handleAction(formData: FormData) {
    try {
      await action(formData);
      showSnackbar({ variant: "success", message: successMessage });
    } catch (e) {
      showSnackbar({
        variant: "error",
        message: mapAdminThrownError(e, {
          generic: tErrors("generic"),
          permission: tErrors("permission"),
          validation: tErrors("validation"),
          session: tErrors("session"),
        }),
      });
    }
  }

  return <form action={handleAction}>{children}</form>;
}

export function AdminFormSubmitButton({
  children,
  pendingLabel,
  variant = "primary",
  className,
}: {
  children: React.ReactNode;
  pendingLabel: string;
  variant?: "primary" | "primaryCompact" | "dangerText";
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      aria-busy={pending}
      className={cn(
        "cursor-pointer",
        variant === "primary" &&
          "bg-primary-container font-headline text-on-primary-container rounded-sm px-6 py-3 text-sm font-semibold",
        variant === "primaryCompact" &&
          "bg-primary-container font-headline text-on-primary-container rounded-sm px-4 py-2 text-xs font-semibold",
        variant === "dangerText" &&
          "text-on-surface-variant hover:text-primary-container text-xs tracking-widest uppercase",
        pending && "cursor-wait opacity-80",
        className,
      )}
      disabled={pending}
      type="submit"
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
