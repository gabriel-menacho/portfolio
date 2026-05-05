import { Mail } from "lucide-react";
import {
  GithubBrandIcon,
  LinkedinBrandIcon,
  WhatsappBrandIcon,
} from "@/components/ui/social-brand-icons";
import { whatsappHref } from "@/lib/whatsapp";
import type { Profile } from "@/types/portfolio";
import { cn } from "@/lib/utils";

export function SocialSidebar({ profile }: { profile: Profile | null }) {
  const email = profile?.email ?? "";
  const mailto = email
    ? `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent("Hello")}`
    : "";
  const phone = profile?.phone ?? "";
  const wa = whatsappHref(phone);
  const github = profile?.social_github;
  const linkedin = profile?.social_linkedin;

  if (!mailto && !wa && !github && !linkedin) return null;

  const linkClass =
    "border-outline-variant/20 text-primary-fixed-dim hover:border-primary-container hover:text-primary-container inline-flex size-10 items-center justify-center rounded-sm border transition-colors";

  return (
    <aside
      aria-label="Social and contact links"
      className={cn(
        "fixed top-1/2 left-3 z-40 hidden -translate-y-1/2 flex-col gap-3 sm:flex md:left-4 md:gap-4",
      )}
    >
      {mailto ? (
        <a
          aria-label="Email"
          className={linkClass}
          href={mailto}
          rel="noreferrer"
        >
          <Mail className="size-5" />
        </a>
      ) : null}
      {wa ? (
        <a
          aria-label="WhatsApp"
          className={linkClass}
          href={wa}
          rel="noreferrer"
          target="_blank"
        >
          <WhatsappBrandIcon className="size-5" />
        </a>
      ) : null}
      {github ? (
        <a
          aria-label="GitHub"
          className={linkClass}
          href={github}
          rel="noreferrer"
          target="_blank"
        >
          <GithubBrandIcon className="size-5" />
        </a>
      ) : null}
      {linkedin ? (
        <a
          aria-label="LinkedIn"
          className={linkClass}
          href={linkedin}
          rel="noreferrer"
          target="_blank"
        >
          <LinkedinBrandIcon className="size-5" />
        </a>
      ) : null}
    </aside>
  );
}
