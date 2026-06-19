import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/routing";
import { absoluteUrl, openGraphLocales } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

const SCREENSHOT_WIDTH = 2880;
const SCREENSHOT_HEIGHT = 1800;

type Screenshot = {
  src: string;
  titleKey: keyof LocalizedScreenshotCopy;
};

const screenshots: Screenshot[] = [
  {
    src: "/projects/academic-architect/01-course-configuration.png",
    titleKey: "courseConfiguration",
  },
  {
    src: "/projects/academic-architect/02-curriculum-orchestrator.png",
    titleKey: "curriculumOrchestrator",
  },
  {
    src: "/projects/academic-architect/03-module-detailer-module-1.png",
    titleKey: "moduleDetailer1",
  },
  {
    src: "/projects/academic-architect/04-module-detailer-module-2.png",
    titleKey: "moduleDetailer2",
  },
  {
    src: "/projects/academic-architect/05-final-syllabus-export.png",
    titleKey: "finalExport",
  },
  {
    src: "/projects/academic-architect/06-export-english-locale.png",
    titleKey: "englishLocale",
  },
];

type LocalizedScreenshotCopy = {
  courseConfiguration: { title: string; caption: string };
  curriculumOrchestrator: { title: string; caption: string };
  moduleDetailer1: { title: string; caption: string };
  moduleDetailer2: { title: string; caption: string };
  finalExport: { title: string; caption: string };
  englishLocale: { title: string; caption: string };
};

type LocalizedProjectCopy = {
  title: string;
  eyebrow: string;
  description: string;
  walkthroughTitle: string;
  walkthroughDescription: string;
  highlightsTitle: string;
  backToPortfolio: string;
  highlights: string[];
  screenshots: LocalizedScreenshotCopy;
};

const projectCopy: Record<Locale, LocalizedProjectCopy> = {
  en: {
    title: "Academic Architect",
    eyebrow: "Pydantic AI curriculum engine",
    description:
      "Academic Architect is a Pydantic AI-powered university curriculum engine for deans and professors. It generates pedagogically sound syllabi with Bloom's Taxonomy mapping, validated time-distribution logic, and professional grading rubrics.",
    walkthroughTitle: "Product walkthrough",
    walkthroughDescription:
      "Screens from a 10-day intensive Legal Tech workshop demo: configure the course, orchestrate modules with AI agents, refine day plans, and export LMS-ready JSON plus professor Markdown.",
    highlightsTitle: "Project highlights",
    backToPortfolio: "Back to portfolio",
    highlights: [
      "Two-phase Pydantic AI orchestration with output validators that enforce session timing programmatically.",
      "Local Ollama vs cloud model toggle for privacy-sensitive environments such as legal education.",
      "Dual export (LMS JSON + professor Markdown) with Spanish and English localization.",
    ],
    screenshots: {
      courseConfiguration: {
        title: "Course configuration",
        caption:
          "Deans and admins set subject, duration, session length, and choose local or cloud AI models.",
      },
      curriculumOrchestrator: {
        title: "Curriculum orchestrator",
        caption:
          "Phase 1 planner agent outputs module structure, learning objectives, and Bloom's Taxonomy mapping.",
      },
      moduleDetailer1: {
        title: "Module detailer — Module 1",
        caption:
          "Phase 2 detailer agent expands each module into day plans with timing breakdowns, materials, and rubrics.",
      },
      moduleDetailer2: {
        title: "Module detailer — Module 2",
        caption:
          "Professors review generated day plans and can regenerate individual days with feedback.",
      },
      finalExport: {
        title: "Final syllabus export",
        caption:
          "Dual-pane export delivers structured JSON for LMS integration and Markdown for print (Spanish locale).",
      },
      englishLocale: {
        title: "English locale export",
        caption:
          "Locale switcher drives agent prompts and export headers; UI and Markdown follow the selected language.",
      },
    },
  },
  es: {
    title: "Academic Architect",
    eyebrow: "Motor de curriculos con Pydantic AI",
    description:
      "Academic Architect es un motor de curriculos universitarios impulsado por Pydantic AI para decanos y profesores. Genera silabos pedagogicamente solidos con mapeo de la Taxonomia de Bloom, logica de distribucion de tiempo validada y rubricas de calificacion profesionales.",
    walkthroughTitle: "Recorrido del producto",
    walkthroughDescription:
      "Capturas de un taller intensivo de Legal Tech de 10 dias: configurar el curso, orquestar modulos con agentes IA, refinar planes diarios y exportar JSON listo para LMS mas Markdown para profesores.",
    highlightsTitle: "Aspectos destacados",
    backToPortfolio: "Volver al portfolio",
    highlights: [
      "Orquestacion Pydantic AI en dos fases con validadores de salida que aplican la duracion de sesion de forma programatica.",
      "Alternancia entre Ollama local y modelos en la nube para entornos sensibles a la privacidad, como educacion legal.",
      "Exportacion dual (JSON para LMS + Markdown para profesores) con localizacion en espanol e ingles.",
    ],
    screenshots: {
      courseConfiguration: {
        title: "Configuracion del curso",
        caption:
          "Decanos y administradores definen materia, duracion, longitud de sesion y eligen modelos IA locales o en la nube.",
      },
      curriculumOrchestrator: {
        title: "Orquestador de curriculo",
        caption:
          "El agente planificador de la Fase 1 genera estructura de modulos, objetivos de aprendizaje y mapeo de la Taxonomia de Bloom.",
      },
      moduleDetailer1: {
        title: "Detalle de modulo — Modulo 1",
        caption:
          "El agente detallista de la Fase 2 expande cada modulo en planes diarios con desglose de tiempos, materiales y rubricas.",
      },
      moduleDetailer2: {
        title: "Detalle de modulo — Modulo 2",
        caption:
          "Los profesores revisan los planes generados y pueden regenerar dias individuales con retroalimentacion.",
      },
      finalExport: {
        title: "Exportacion final del silabo",
        caption:
          "La exportacion en doble panel entrega JSON estructurado para integracion LMS y Markdown para impresion (locale espanol).",
      },
      englishLocale: {
        title: "Exportacion en locale ingles",
        caption:
          "El selector de idioma guia los prompts de los agentes y los encabezados de exportacion; la UI y el Markdown siguen el idioma seleccionado.",
      },
    },
  },
  pt: {
    title: "Academic Architect",
    eyebrow: "Motor de curriculos com Pydantic AI",
    description:
      "Academic Architect e um motor de curriculos universitarios com Pydantic AI para decanos e professores. Gera ementas pedagogicamente solidas com mapeamento da Taxonomia de Bloom, logica de distribuicao de tempo validada e rubricas de avaliacao profissionais.",
    walkthroughTitle: "Tour pelo produto",
    walkthroughDescription:
      "Capturas de uma oficina intensiva de Legal Tech de 10 dias: configurar o curso, orquestrar modulos com agentes IA, refinar planos diarios e exportar JSON pronto para LMS mais Markdown para professores.",
    highlightsTitle: "Destaques do projeto",
    backToPortfolio: "Voltar ao portfolio",
    highlights: [
      "Orquestracao Pydantic AI em duas fases com validadores de saida que aplicam a duracao da sessao programaticamente.",
      "Alternancia entre Ollama local e modelos em nuvem para ambientes sensiveis a privacidade, como educacao juridica.",
      "Exportacao dual (JSON para LMS + Markdown para professores) com localizacao em espanhol e ingles.",
    ],
    screenshots: {
      courseConfiguration: {
        title: "Configuracao do curso",
        caption:
          "Decanos e administradores definem materia, duracao, duracao da sessao e escolhem modelos IA locais ou em nuvem.",
      },
      curriculumOrchestrator: {
        title: "Orquestrador de curriculo",
        caption:
          "O agente planejador da Fase 1 gera estrutura de modulos, objetivos de aprendizagem e mapeamento da Taxonomia de Bloom.",
      },
      moduleDetailer1: {
        title: "Detalhe do modulo — Modulo 1",
        caption:
          "O agente detalhista da Fase 2 expande cada modulo em planos diarios com divisao de tempos, materiais e rubricas.",
      },
      moduleDetailer2: {
        title: "Detalhe do modulo — Modulo 2",
        caption:
          "Professores revisam os planos gerados e podem regenerar dias individuais com feedback.",
      },
      finalExport: {
        title: "Exportacao final da ementa",
        caption:
          "Exportacao em painel duplo entrega JSON estruturado para integracao LMS e Markdown para impressao (locale espanhol).",
      },
      englishLocale: {
        title: "Exportacao em locale ingles",
        caption:
          "O seletor de idioma guia os prompts dos agentes e os cabecalhos de exportacao; a UI e o Markdown seguem o idioma selecionado.",
      },
    },
  },
};

function languageAlternatesForProject(): Record<string, string> {
  return {
    en: absoluteUrl("/en/projects/academic-architect"),
    es: absoluteUrl("/es/projects/academic-architect"),
    pt: absoluteUrl("/pt/projects/academic-architect"),
    "x-default": absoluteUrl("/en/projects/academic-architect"),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const copy = projectCopy[loc] ?? projectCopy.en;
  const pageUrl = absoluteUrl(`/${loc}/projects/academic-architect`);
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

export default async function AcademicArchitectProjectPage({ params }: Props) {
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
          aria-labelledby="academic-architect-walkthrough-heading"
          className="flex flex-col gap-8"
        >
          <div className="space-y-2">
            <h2
              className="font-headline text-2xl font-semibold"
              id="academic-architect-walkthrough-heading"
            >
              {copy.walkthroughTitle}
            </h2>
            <p className="text-on-surface-variant text-sm leading-relaxed md:text-base">
              {copy.walkthroughDescription}
            </p>
          </div>

          {screenshots.map((screenshot) => {
            const screenCopy = copy.screenshots[screenshot.titleKey];
            return (
              <figure
                className="border-outline-variant/20 bg-surface-container flex flex-col gap-4 rounded-sm border p-6 md:gap-5 md:p-8"
                key={screenshot.src}
              >
                <figcaption className="space-y-2">
                  <h3 className="font-headline text-xl font-semibold">
                    {screenCopy.title}
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed md:text-base">
                    {screenCopy.caption}
                  </p>
                </figcaption>
                <div className="bg-surface-container-lowest overflow-hidden rounded-sm">
                  <Image
                    alt={screenCopy.title}
                    className="h-auto w-full"
                    height={SCREENSHOT_HEIGHT}
                    sizes="(min-width: 1024px) 896px, 100vw"
                    src={screenshot.src}
                    width={SCREENSHOT_WIDTH}
                  />
                </div>
              </figure>
            );
          })}
        </section>

        <section className="grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
          <div className="space-y-3">
            <h2 className="font-headline text-2xl font-semibold">
              {copy.highlightsTitle}
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
              {copy.backToPortfolio}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
