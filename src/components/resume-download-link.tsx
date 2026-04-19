"use client";

import { useCallback, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

function isGeneratedResumePdfHref(href: string): boolean {
  if (href.startsWith("/api/resume/pdf")) return true;
  try {
    const u = new URL(href);
    return u.pathname === "/api/resume/pdf";
  } catch {
    return false;
  }
}

export function ResumeDownloadLink({
  href,
  className,
  children,
  leadingIcon = "none",
  leadingIconClassName = "size-4",
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  leadingIcon?: "download" | "none";
  leadingIconClassName?: string;
}) {
  const [pending, setPending] = useState(false);
  const useClientFetch = isGeneratedResumePdfHref(href);

  const onClick = useCallback(
    async () => {
      if (!useClientFetch || pending) return;
      setPending(true);
      try {
        const res = await fetch(href);
        if (!res.ok) throw new Error("Failed to generate resume");
        const blob = await res.blob();
        const objectUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = objectUrl;
        const cd = res.headers.get("Content-Disposition");
        const match = cd?.match(/filename="?([^";]+)"?/i);
        a.download = match?.[1]?.trim() || "resume.pdf";
        a.rel = "noopener";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(objectUrl);
      } catch {
        console.error("Resume download failed");
      } finally {
        setPending(false);
      }
    },
    [href, pending, useClientFetch],
  );

  if (!useClientFetch) {
    return (
      <a className={className} download href={href}>
        {leadingIcon === "download" ? (
          <Download className={leadingIconClassName} />
        ) : null}
        {children}
      </a>
    );
  }

  const showLoader = pending;
  const showDownload = leadingIcon === "download" && !pending;
  const showLeading =
    leadingIcon === "download" ? showDownload || showLoader : showLoader;

  return (
    <button
      aria-busy={pending}
      className={cn(className, pending && "cursor-wait")}
      disabled={pending}
      onClick={onClick}
      type="button"
    >
      {showLeading ? (
        showLoader ? (
          <Loader2
            aria-hidden
            className={cn("animate-spin", leadingIconClassName)}
          />
        ) : (
          <Download aria-hidden className={leadingIconClassName} />
        )
      ) : null}
      {children}
    </button>
  );
}
