import { defineRouting } from "next-intl/routing";

export const locales = ["en", "es", "pt"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales: [...locales],
  defaultLocale: "en",
  localePrefix: "always",
  /** Use English unless the URL explicitly includes `/es` or `/pt`. */
  localeDetection: false,
});
