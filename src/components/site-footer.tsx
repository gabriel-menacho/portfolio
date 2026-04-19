import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";

export async function SiteFooter({ className }: { className?: string }) {
  const t = await getTranslations("footer");

  return (
    <footer
      className={cn(
        "border-outline-variant/15 text-on-surface-variant border-t",
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-8 py-10 sm:flex-row sm:items-center sm:justify-between md:px-12 lg:px-16">
        <a
          className="font-headline text-primary-fixed-dim hover:text-primary-container text-sm font-semibold tracking-tight transition-colors"
          href="https://gabrielmenacho.dev"
          rel="noopener noreferrer"
          target="_blank"
        >
          gabrielmenacho.dev
        </a>
        <p className="font-headline max-w-prose text-xs leading-relaxed tracking-wide sm:text-right">
          {t("credit")}
        </p>
      </div>
    </footer>
  );
}
