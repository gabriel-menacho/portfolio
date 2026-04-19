"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import {
  clearResumeOverride,
  updateProfile,
  uploadAvatar,
  uploadResumeOverride,
} from "@/app/[locale]/admin/actions";
import { initialProfileActionState } from "@/app/[locale]/admin/profile-action-state";
import { publicObjectUrl } from "@/lib/storage";
import type { Profile } from "@/types/portfolio";

function FormAlert({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p
      className="rounded-sm border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-300"
      role="alert"
    >
      {message}
    </p>
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

  const [profileState, profileAction] = useActionState(
    updateProfile,
    initialProfileActionState,
  );
  const [avatarState, avatarAction] = useActionState(
    uploadAvatar,
    initialProfileActionState,
  );
  const [resumeState, resumeAction] = useActionState(
    uploadResumeOverride,
    initialProfileActionState,
  );
  const [clearState, clearAction] = useActionState(
    clearResumeOverride,
    initialProfileActionState,
  );

  return (
    <>
      <form action={profileAction} className="space-y-8">
        <FormAlert message={profileState.error} />
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

        <button
          className="bg-primary-container font-headline text-on-primary-container rounded-sm px-6 py-3 text-sm font-semibold"
          type="submit"
        >
          {t("save")}
        </button>
      </form>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="bg-surface-container rounded-sm p-6">
          <h2 className="font-headline text-lg font-semibold">Avatar</h2>
          <p className="text-on-surface-variant mt-2 text-xs">
            Current: {publicObjectUrl(p?.avatar_path ?? null) ?? "none"}
          </p>
          <form action={avatarAction} className="mt-4 space-y-3">
            <FormAlert message={avatarState.error} />
            <input name="locale" type="hidden" value={locale} />
            <input accept="image/*" name="avatar" required type="file" />
            <button
              className="border-outline-variant/20 font-headline hover:border-primary-container rounded-sm border px-4 py-2 text-xs tracking-widest uppercase"
              type="submit"
            >
              Upload
            </button>
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
            <FormAlert message={resumeState.error} />
            <input name="locale" type="hidden" value={locale} />
            <input
              accept="application/pdf"
              name="resume"
              required
              type="file"
            />
            <button
              className="border-outline-variant/20 font-headline hover:border-primary-container rounded-sm border px-4 py-2 text-xs tracking-widest uppercase"
              type="submit"
            >
              Upload PDF
            </button>
          </form>
          <form action={clearAction} className="mt-3 space-y-2">
            <FormAlert message={clearState.error} />
            <input name="locale" type="hidden" value={locale} />
            <button
              className="text-on-surface-variant hover:text-primary-container text-xs tracking-widest uppercase"
              type="submit"
            >
              Clear override
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
