"use client";

import { useTranslations } from "next-intl";
import { useFormStatus } from "react-dom";
import { mapAdminThrownError } from "@/components/admin/admin-action-error";
import { useAdminSnackbar } from "@/components/admin/admin-snackbar";
import { cn } from "@/lib/utils";

type ServerAction = (formData: FormData) => Promise<void>;

function PendingDot() {
  const { pending } = useFormStatus();
  return (
    <span
      aria-hidden
      className={cn(
        "text-on-surface-variant inline-block w-4 text-center text-xs",
        !pending && "invisible",
      )}
    >
      …
    </span>
  );
}

export function AdminSiteVisibilityToggleForm({
  action,
  id,
  locale,
  showOnSite,
  savedMessage,
  label,
}: {
  action: ServerAction;
  /** Omit for site-wide toggles (e.g. homepage section) that do not target a row id. */
  id?: string;
  locale: string;
  showOnSite: boolean;
  savedMessage: string;
  label: string;
}) {
  const { showSnackbar } = useAdminSnackbar();
  const tErrors = useTranslations("admin.formErrors");

  async function handleAction(formData: FormData) {
    try {
      await action(formData);
      showSnackbar({ variant: "success", message: savedMessage });
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

  return (
    <form
      action={handleAction}
      className="flex shrink-0 items-center gap-2"
      key={id ? `${id}-site-${showOnSite}` : `site-${showOnSite}`}
    >
      {id ? <input name="id" type="hidden" value={id} /> : null}
      <input name="locale" type="hidden" value={locale} />
      <label className="flex cursor-pointer items-center gap-2 text-xs">
        <input
          className="accent-primary-container size-4 cursor-pointer"
          defaultChecked={showOnSite}
          name="show_on_site"
          onChange={(e) => {
            e.currentTarget.form?.requestSubmit();
          }}
          type="checkbox"
          value="on"
        />
        <span className="text-on-surface-variant tracking-widest uppercase">
          {label}
        </span>
      </label>
      <PendingDot />
    </form>
  );
}
