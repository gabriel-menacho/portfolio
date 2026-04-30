import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/i18n/routing";
import { absoluteUrl, openGraphLocales } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

/** Appetize app page (play); free tier does not support embedding on external sites. */
const APPETIZE_APP_URL =
  "https://appetize.io/app/b_gjfas3mp4lxawzvyend337tsaq";
const AUTONEXUS_REPO_URL = "https://github.com/gabriel-menacho/autonexus";

type LocalizedProjectCopy = {
  title: string;
  description: string;
  highlights: string[];
};

const projectCopy: Record<Locale, LocalizedProjectCopy> = {
  en: {
    title: "AutoNexus",
    description:
      "AutoNexus is an Expo + React Native marketplace app for buying, renting, and selling vehicles, backed by a typed API contract and AWS infrastructure.",
    highlights: [
      "Cross-platform mobile app built with Expo Router and NativeWind.",
      "Mock API mode for fast UI development when backend services are unavailable.",
      "AWS-backed architecture with Cognito auth, API Gateway, Lambda, DynamoDB, and S3 media flows.",
    ],
  },
  es: {
    title: "AutoNexus",
    description:
      "AutoNexus es una app de marketplace en Expo + React Native para comprar, alquilar y vender vehiculos, respaldada por un contrato de API tipado e infraestructura en AWS.",
    highlights: [
      "Aplicacion movil multiplataforma construida con Expo Router y NativeWind.",
      "Modo de API mock para avanzar UI rapidamente cuando el backend no esta disponible.",
      "Arquitectura en AWS con autenticacion Cognito, API Gateway, Lambda, DynamoDB y flujos de media en S3.",
    ],
  },
  pt: {
    title: "AutoNexus",
    description:
      "AutoNexus e um app de marketplace em Expo + React Native para compra, aluguel e venda de veiculos, com contrato de API tipado e infraestrutura AWS.",
    highlights: [
      "Aplicativo movel multiplataforma construido com Expo Router e NativeWind.",
      "Modo de API mock para iterar UI rapidamente quando servicos backend nao estao disponiveis.",
      "Arquitetura em AWS com autenticacao Cognito, API Gateway, Lambda, DynamoDB e fluxos de midia em S3.",
    ],
  },
};

function languageAlternatesForProject(): Record<string, string> {
  return {
    en: absoluteUrl("/en/projects/autonexus"),
    es: absoluteUrl("/es/projects/autonexus"),
    pt: absoluteUrl("/pt/projects/autonexus"),
    "x-default": absoluteUrl("/en/projects/autonexus"),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const copy = projectCopy[loc] ?? projectCopy.en;
  const pageUrl = absoluteUrl(`/${loc}/projects/autonexus`);
  const ogLocales = openGraphLocales(loc);

  return {
    title: `${copy.title} | Project`,
    description: copy.description,
    alternates: {
      canonical: pageUrl,
      languages: languageAlternatesForProject(),
    },
    openGraph: {
      type: "article",
      url: pageUrl,
      title: copy.title,
      description: copy.description,
      locale: ogLocales.locale,
      alternateLocale: ogLocales.alternateLocale,
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
    },
  };
}

export default async function AutonexusProjectPage({ params }: Props) {
  const { locale } = await params;
  const loc = locale as Locale;
  const copy = projectCopy[loc] ?? projectCopy.en;

  return (
    <main className="px-8 py-24 md:px-12 lg:px-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <div className="space-y-4">
          <p className="text-on-surface-variant text-sm uppercase tracking-wide">
            Expo React Native Project
          </p>
          <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
            {copy.title}
          </h1>
          <p className="text-on-surface-variant max-w-3xl text-base leading-relaxed md:text-lg">
            {copy.description}
          </p>
        </div>

        <div className="border-outline-variant/20 bg-surface-container rounded-sm border p-6 md:p-8">
          <p className="text-on-surface mb-4 text-sm leading-relaxed md:text-base">
            Interactive preview runs on Appetize (opens in a new tab).
          </p>
          <a
            className="bg-primary-container font-headline text-on-primary-container hover:brightness-[0.92] focus-visible:ring-primary-fixed-dim inline-flex w-full min-h-12 items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-center text-base font-semibold tracking-tight transition-[filter] md:w-auto md:min-w-[16rem] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-container)] focus-visible:outline-none"
            href={APPETIZE_APP_URL}
            rel="noreferrer"
            target="_blank"
          >
            <span>Open interactive preview</span>
            <ExternalLink aria-hidden className="size-4 shrink-0 opacity-90" />
          </a>
        </div>

        <section className="grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
          <div className="space-y-3">
            <h2 className="font-headline text-2xl font-semibold">
              Project highlights
            </h2>
            <ul className="text-on-surface-variant list-disc space-y-2 pl-5">
              {copy.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <a
              className="bg-surface-container-highest text-on-surface hover:bg-surface-container inline-flex items-center justify-center rounded-sm px-4 py-2 text-sm font-medium"
              href={AUTONEXUS_REPO_URL}
              rel="noreferrer"
              target="_blank"
            >
              View repository
            </a>
            <Link
              className="border-outline text-on-surface hover:bg-surface-container inline-flex items-center justify-center rounded-sm border px-4 py-2 text-sm font-medium"
              href={`/${loc}`}
            >
              Back to portfolio
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
