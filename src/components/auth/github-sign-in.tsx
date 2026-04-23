"use client";

import { useState } from "react";
import { GithubBrandIcon } from "@/components/ui/social-brand-icons";
import { createClient } from "@/lib/supabase/client";

export function GithubSignIn({
  nextPath,
  label,
}: {
  nextPath: string;
  label: string;
}) {
  const [pending, setPending] = useState(false);

  async function onClick() {
    setPending(true);
    const supabase = createClient();
    const origin = window.location.origin;
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${origin}/api/auth/callback?next=${encodeURIComponent(nextPath)}`,
      },
    });
    setPending(false);
  }

  return (
    <button
      className="cursor-pointer bg-primary-container font-headline text-on-primary-container inline-flex w-full items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
      disabled={pending}
      onClick={onClick}
      type="button"
    >
      <GithubBrandIcon className="size-4" />
      {pending ? "Redirecting…" : label}
    </button>
  );
}
