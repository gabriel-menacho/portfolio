import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Inter, Space_Grotesk } from "next/font/google";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import { ThemeProvider } from "@/components/theme-provider";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { PALETTE_COOKIE, parsePaletteId } from "@/lib/palette";
import { parseThemePreference, THEME_COOKIE } from "@/lib/theme";

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
  const store = await cookies();
  const theme = parseThemePreference(store.get(THEME_COOKIE)?.value);
  const palette = parsePaletteId(store.get(PALETTE_COOKIE)?.value);

  return (
    <html
      className={cn(
        inter.variable,
        space.variable,
        "h-full",
        theme === "dark" && "dark",
        theme === "light" && "light",
      )}
      data-palette={palette === "default" ? undefined : palette}
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
