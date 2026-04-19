import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Inter, Space_Grotesk } from "next/font/google";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import { ThemeProvider } from "@/components/theme-provider";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { parseThemePreference, THEME_HEADER } from "@/lib/theme";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const theme = parseThemePreference((await headers()).get(THEME_HEADER));

  return (
    <html
      className={cn(
        inter.variable,
        space.variable,
        "h-full",
        theme === "dark" && "dark",
        theme === "light" && "light",
      )}
      lang={locale}
      suppressHydrationWarning
    >
      <body className="bg-surface text-on-surface min-h-full antialiased">
        <ThemeProvider defaultTheme={theme} key={theme}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
            <ScrollToTopButton />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
