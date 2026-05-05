"use client";

import { useActionState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import {
  clearResumeOverride,
  updateProfile,
  uploadAvatar,
  uploadResumeOverride,
} from "@/app/[locale]/admin/actions";
import { initialProfileActionState } from "@/app/[locale]/admin/profile-action-state";
import { useAdminSnackbar } from "@/components/admin/admin-snackbar";
import { publicObjectUrl } from "@/lib/storage";
import { cn } from "@/lib/utils";
import type { Profile } from "@/types/portfolio";

function useSubmitSnackbarFeedback(
  isPending: boolean,
  error: string | null,
  successMessage: string,
) {
  const { showSnackbar } = useAdminSnackbar();
  const prevPending = useRef(false);
  const armed = useRef(false);

  useEffect(() => {
    if (isPending) armed.current = true;
  }, [isPending]);

  useEffect(() => {
    if (prevPending.current && !isPending && armed.current) {
      armed.current = false;
      if (error) {
        showSnackbar({ variant: "error", message: error });
      } else {
        showSnackbar({ variant: "success", message: successMessage });
      }
    }
    prevPending.current = isPending;
  }, [error, isPending, showSnackbar, successMessage]);
}

function PendingSubmitButton({
  isPending,
  pendingLabel,
  className,
  children,
}: {
  isPending: boolean;
  pendingLabel: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <button
      aria-busy={isPending}
      className={cn(
        "cursor-pointer",
        className,
        isPending && "cursor-wait opacity-80",
      )}
      disabled={isPending}
      type="submit"
    >
      {isPending ? pendingLabel : children}
    </button>
  );
}

function LocalizedBlock({
  label,
  name,
  values,
  rows = 3,
}: {
  label: string;
  name: string;
  values?: { en: string; es: string; pt: string } | null;
  rows?: number;
}) {
  return (
    <div className="space-y-3">
      <div className="font-headline text-outline-variant text-xs tracking-widest uppercase">
        {label}
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {(["en", "es", "pt"] as const).map((l) => (
          <label className="block space-y-2" key={l}>
            <span className="text-on-surface-variant text-[10px] tracking-widest uppercase">
              {l}
            </span>
            <textarea
              className="border-outline-variant/20 bg-surface-container min-h-[90px] w-full rounded-sm border px-3 py-2 text-sm"
              defaultValue={values?.[l] ?? ""}
              name={`${name}.${l}`}
              rows={rows}
            />
          </label>
        ))}
      </div>
    </div>
  );
}

export function AdminProfileForms({
  locale,
  profile,
}: {
  locale: string;
  profile: Profile | null;
}) {
  const t = useTranslations("admin");
  const p = profile;
  const dn = p?.display_name;
  const hl = p?.headline;
  const bio = p?.bio;
  const role = p?.role_label;
  const locJson = p?.location;

  const [profileState, profileAction, profilePending] = useActionState(
    updateProfile,
    initialProfileActionState,
  );
  const [avatarState, avatarAction, avatarPending] = useActionState(
    uploadAvatar,
    initialProfileActionState,
  );
  const [resumeState, resumeAction, resumePending] = useActionState(
    uploadResumeOverride,
    initialProfileActionState,
  );
  const [clearState, clearAction, clearPending] = useActionState(
    clearResumeOverride,
    initialProfileActionState,
  );

  useSubmitSnackbarFeedback(
    profilePending,
    profileState.error,
    t("saved"),
  );
  useSubmitSnackbarFeedback(avatarPending, avatarState.error, t("saved"));
  useSubmitSnackbarFeedback(resumePending, resumeState.error, t("saved"));
  useSubmitSnackbarFeedback(clearPending, clearState.error, t("cleared"));

  return (
    <>
      <form action={profileAction} className="space-y-8">
        <input name="locale" type="hidden" value={locale} />
        <LocalizedBlock label="Display name" name="display_name" values={dn} />
        <LocalizedBlock label="Headline" name="headline" values={hl} />
        <LocalizedBlock label="Bio" name="bio" rows={6} values={bio} />
        <LocalizedBlock label="Role label" name="role_label" values={role} />
        <LocalizedBlock label="Location" name="location" values={locJson} />

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block space-y-2">
            <span className="font-headline text-outline-variant text-xs tracking-widest uppercase">
              Email (mailto)
            </span>
            <input
              className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
              defaultValue={p?.email ?? ""}
              name="email"
              type="email"
            />
          </label>
          <label className="block space-y-2">
            <span className="font-headline text-outline-variant text-xs tracking-widest uppercase">
              Phone (WhatsApp)
            </span>
            <input
              className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
              defaultValue={p?.phone ?? ""}
              name="phone"
              placeholder="+1 555 123 4567"
              type="tel"
            />
          </label>
          <label className="block space-y-2">
            <span className="font-headline text-outline-variant text-xs tracking-widest uppercase">
              GitHub URL
            </span>
            <input
              className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
              defaultValue={p?.social_github ?? ""}
              name="social_github"
              type="url"
            />
          </label>
          <label className="block space-y-2 md:col-span-2">
            <span className="font-headline text-outline-variant text-xs tracking-widest uppercase">
              LinkedIn URL
            </span>
            <input
              className="border-outline-variant/20 bg-surface-container w-full rounded-sm border px-3 py-2 text-sm"
              defaultValue={p?.social_linkedin ?? ""}
              name="social_linkedin"
              type="url"
            />
          </label>
        </div>

        <PendingSubmitButton
          className="bg-primary-container font-headline text-on-primary-container rounded-sm px-6 py-3 text-sm font-semibold"
          isPending={profilePending}
          pendingLabel={t("saving")}
        >
          {t("save")}
        </PendingSubmitButton>
      </form>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="bg-surface-container rounded-sm p-6">
          <h2 className="font-headline text-lg font-semibold">Avatar</h2>
          <p className="text-on-surface-variant mt-2 text-xs">
            Current: {publicObjectUrl(p?.avatar_path ?? null) ?? "none"}
          </p>
          <form action={avatarAction} className="mt-4 space-y-3">
            <input name="locale" type="hidden" value={locale} />
            <input accept="image/*" name="avatar" required type="file" />
            <PendingSubmitButton
              className="border-outline-variant/20 font-headline hover:border-primary-container rounded-sm border px-4 py-2 text-xs tracking-widest uppercase"
              isPending={avatarPending}
              pendingLabel={t("uploading")}
            >
              Upload
            </PendingSubmitButton>
          </form>
        </div>

        <div className="bg-surface-container rounded-sm p-6">
          <h2 className="font-headline text-lg font-semibold">
            Resume override
          </h2>
          <p className="text-on-surface-variant mt-2 text-xs">
            When set, the primary download uses this PDF. Generated ATS PDF
            stays available.
          </p>
          <p className="text-on-surface-variant mt-2 text-xs">
            Current:{" "}
            {publicObjectUrl(p?.resume_override_path ?? null) ?? "none"}
          </p>
          <form action={resumeAction} className="mt-4 space-y-3">
            <input name="locale" type="hidden" value={locale} />
            <input
              accept="application/pdf"
              name="resume"
              required
              type="file"
            />
            <PendingSubmitButton
              className="border-outline-variant/20 font-headline hover:border-primary-container rounded-sm border px-4 py-2 text-xs tracking-widest uppercase"
              isPending={resumePending}
              pendingLabel={t("uploading")}
            >
              Upload PDF
            </PendingSubmitButton>
          </form>
          <form action={clearAction} className="mt-3 space-y-2">
            <input name="locale" type="hidden" value={locale} />
            <PendingSubmitButton
              className="text-on-surface-variant hover:text-primary-container text-xs tracking-widest uppercase"
              isPending={clearPending}
              pendingLabel={t("deleting")}
            >
              Clear override
            </PendingSubmitButton>
          </form>
        </div>
      </div>
    </>
  );
}
