"use client";

import { useTranslations } from "next-intl";
import { Check, Copy, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import {
  GithubBrandIcon,
  LinkedinBrandIcon,
} from "@/components/ui/social-brand-icons";
import { pickLocalized } from "@/lib/i18n-content";
import type { Locale } from "@/i18n/routing";
import type { Profile } from "@/types/portfolio";
import { cn } from "@/lib/utils";

export function ContactSection({
  locale,
  profile,
  panelNote,
}: {
  locale: Locale;
  profile: Profile | null;
  panelNote: string;
}) {
  const t = useTranslations();
  const [copied, setCopied] = useState(false);
  const email = profile?.email ?? "";
  const location = pickLocalized(profile?.location ?? null, locale);
  const mailto = email
    ? `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent("Hello")}`
    : "#";

  async function copyEmail() {
    if (!email) return;
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <section className="px-8 py-24 md:px-12 md:py-32 lg:px-16" id="contact">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 md:grid-cols-2 md:gap-20">
        <div>
          <h2 className="font-headline mb-8 text-4xl font-bold tracking-tighter md:text-5xl">
            {t("contact.title")}
          </h2>
          <p className="text-on-surface-variant mb-12 text-lg">
            {t("contact.subtitle")}
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="bg-surface-container hover:bg-primary-container flex size-12 items-center justify-center rounded-sm transition-colors">
                <Mail className="text-primary-fixed-dim group-hover:text-on-primary-container size-5" />
              </div>
              <div className="flex-1">
                <p className="font-headline text-outline-variant text-[10px] tracking-[0.25em] uppercase">
                  {t("contact.email")}
                </p>
                <p className="font-headline text-lg font-semibold">
                  {email || "—"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="bg-surface-container flex size-12 items-center justify-center rounded-sm">
                <MapPin className="text-primary-fixed-dim size-5" />
              </div>
              <div>
                <p className="font-headline text-outline-variant text-[10px] tracking-[0.25em] uppercase">
                  {t("contact.location")}
                </p>
                <p className="font-headline text-lg font-semibold">
                  {location || "—"}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <button
              className="border-outline-variant/20 font-headline hover:border-primary-container hover:text-primary-container inline-flex items-center gap-2 rounded-sm border px-4 py-2 text-sm"
              disabled={!email}
              onClick={copyEmail}
              type="button"
            >
              {copied ? (
                <Check className="size-4" />
              ) : (
                <Copy className="size-4" />
              )}
              {copied ? t("contact.copied") : t("contact.copy")}
            </button>
            <a
              className={cn(
                "bg-primary-container font-headline text-on-primary-container inline-flex items-center gap-2 rounded-sm px-5 py-2 text-sm font-semibold",
                !email && "pointer-events-none opacity-40",
              )}
              href={mailto}
            >
              {t("contact.mailto")}
            </a>
          </div>
          <div className="mt-10 flex gap-3">
            {profile?.social_github ? (
              <a
                aria-label="GitHub"
                className="border-outline-variant/30 hover:border-primary-container hover:text-primary-container flex size-10 items-center justify-center rounded-sm border"
                href={profile.social_github}
                rel="noreferrer"
                target="_blank"
              >
                <GithubBrandIcon className="size-5" />
              </a>
            ) : null}
            {profile?.social_linkedin ? (
              <a
                aria-label="LinkedIn"
                className="border-outline-variant/30 hover:border-primary-container hover:text-primary-container flex size-10 items-center justify-center rounded-sm border"
                href={profile.social_linkedin}
                rel="noreferrer"
                target="_blank"
              >
                <LinkedinBrandIcon className="size-5" />
              </a>
            ) : null}
          </div>
        </div>
        <div className="bg-surface-container rounded-sm p-10">
          <p className="text-on-surface-variant text-sm leading-relaxed">
            {panelNote}
          </p>
        </div>
      </div>
    </section>
  );
}
