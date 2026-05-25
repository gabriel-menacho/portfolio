import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "@/i18n/routing";
import { absoluteUrl, openGraphLocales } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

const LEGISFLOW_VIDEO_SRC = `/projects/legisflow/${encodeURIComponent("LegisFlow - promotional video.mp4")}`;

type LocalizedProjectCopy = {
  title: string;
  description: string;
  highlights: string[];
  videoTitle: string;
  videoDescription: string;
  eyebrow: string;
};

const projectCopy: Record<Locale, LocalizedProjectCopy> = {
  en: {
    title: "LegisFlow",
    eyebrow: "Legal-tech SaaS",
    description:
      "LegisFlow is a legal-tech SaaS monorepo with a marketing site, firm portal, AI assistant (RAG), and workflow automation for law firms.",
    videoTitle: "Product walkthrough",
    videoDescription:
      "This walkthrough shows how LegisFlow brings together a public marketing site, a secure firm portal, an AI assistant grounded in firm documents, and workflow automation—so law firms can manage clients, cases, and knowledge in one product instead of juggling separate tools.",
    highlights: [
      "Lerna + npm workspaces: Next.js 15 marketing and portal, shared TypeScript types.",
      "FastAPI backend with Pydantic AI, pgvector document RAG, and workflow triggers.",
      "Docker Compose stack with PostgreSQL, Ollama, and pluggable LLM providers (OpenAI, Anthropic, OpenRouter).",
    ],
  },
  es: {
    title: "LegisFlow",
    eyebrow: "SaaS legal-tech",
    description:
      "LegisFlow es un monorepo SaaS legal-tech con sitio de marketing, portal para bufetes, asistente IA (RAG) y automatizacion de flujos de trabajo.",
    videoTitle: "Recorrido del producto",
    videoDescription:
      "Este video muestra como LegisFlow integra un sitio de marketing publico, un portal seguro para bufetes, un asistente IA basado en documentos del despacho y automatizacion de flujos, para que los bufetes gestionen clientes, casos y conocimiento en un solo producto.",
    highlights: [
      "Lerna + npm workspaces: marketing y portal en Next.js 15, tipos TypeScript compartidos.",
      "Backend FastAPI con Pydantic AI, RAG de documentos con pgvector y disparadores de flujos.",
      "Stack Docker Compose con PostgreSQL, Ollama y proveedores LLM configurables (OpenAI, Anthropic, OpenRouter).",
    ],
  },
  pt: {
    title: "LegisFlow",
    eyebrow: "SaaS legal-tech",
    description:
      "LegisFlow e um monorepo SaaS legal-tech com site de marketing, portal para escritorios, assistente IA (RAG) e automacao de fluxos de trabalho.",
    videoTitle: "Tour pelo produto",
    videoDescription:
      "Este video mostra como o LegisFlow reune site de marketing, portal seguro para escritorios, assistente IA com base em documentos do escritorio e automacao de fluxos—para que escritorios gerenciem clientes, casos e conhecimento em um unico produto.",
    highlights: [
      "Lerna + npm workspaces: marketing e portal em Next.js 15, tipos TypeScript compartilhados.",
      "Backend FastAPI com Pydantic AI, RAG de documentos com pgvector e gatilhos de fluxos.",
      "Stack Docker Compose com PostgreSQL, Ollama e provedores LLM configuraveis (OpenAI, Anthropic, OpenRouter).",
    ],
  },
};

function languageAlternatesForProject(): Record<string, string> {
  return {
    en: absoluteUrl("/en/projects/legisflow"),
    es: absoluteUrl("/es/projects/legisflow"),
    pt: absoluteUrl("/pt/projects/legisflow"),
    "x-default": absoluteUrl("/en/projects/legisflow"),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const copy = projectCopy[loc] ?? projectCopy.en;
  const pageUrl = absoluteUrl(`/${loc}/projects/legisflow`);
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

export default async function LegisflowProjectPage({ params }: Props) {
  const { locale } = await params;
  const loc = locale as Locale;
  const copy = projectCopy[loc] ?? projectCopy.en;

  return (
    <main className="px-8 py-24 md:px-12 lg:px-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <div className="space-y-4">
          <p className="text-on-surface-variant text-sm uppercase tracking-wide">
            {copy.eyebrow}
          </p>
          <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
            {copy.title}
          </h1>
          <p className="text-on-surface-variant max-w-3xl text-base leading-relaxed md:text-lg">
            {copy.description}
          </p>
        </div>

        <section
          aria-labelledby="legisflow-video-heading"
          className="border-outline-variant/20 bg-surface-container flex flex-col gap-4 rounded-sm border p-6 md:gap-5 md:p-8"
        >
          <div className="space-y-2">
            <h2
              className="font-headline text-2xl font-semibold"
              id="legisflow-video-heading"
            >
              {copy.videoTitle}
            </h2>
            <p className="text-on-surface-variant text-sm leading-relaxed md:text-base">
              {copy.videoDescription}
            </p>
          </div>
          <div className="bg-surface-container-lowest aspect-video w-full overflow-hidden rounded-sm">
            <video
              className="size-full object-contain"
              controls
              playsInline
              preload="metadata"
              src={LEGISFLOW_VIDEO_SRC}
            />
          </div>
        </section>

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
