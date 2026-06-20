import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/routing";
import { absoluteUrl, openGraphLocales } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

type Screenshot = {
  src: string;
  titleKey: keyof LocalizedScreenshotCopy;
  width: number;
  height: number;
};

const screenshots: Screenshot[] = [
  {
    src: "/projects/sous-chef/01-landing.png",
    titleKey: "landing",
    width: 1440,
    height: 900,
  },
  {
    src: "/projects/sous-chef/02-dashboard.png",
    titleKey: "dashboard",
    width: 1440,
    height: 900,
  },
  {
    src: "/projects/sous-chef/03-recipe-new.png",
    titleKey: "recipeNew",
    width: 1440,
    height: 900,
  },
  {
    src: "/projects/sous-chef/04-recipe-detail.png",
    titleKey: "recipeDetail",
    width: 1440,
    height: 2006,
  },
  {
    src: "/projects/sous-chef/05-mise-en-place.png",
    titleKey: "miseEnPlace",
    width: 1440,
    height: 900,
  },
  {
    src: "/projects/sous-chef/06-service-drawer.png",
    titleKey: "serviceDrawer",
    width: 1440,
    height: 900,
  },
  {
    src: "/projects/sous-chef/06-service-timeline.png",
    titleKey: "serviceTimeline",
    width: 1440,
    height: 1372,
  },
  {
    src: "/projects/sous-chef/07-inventory.png",
    titleKey: "inventory",
    width: 1440,
    height: 1314,
  },
  {
    src: "/projects/sous-chef/08-techniques.png",
    titleKey: "techniques",
    width: 1440,
    height: 1894,
  },
  {
    src: "/projects/sous-chef/09-orchestrator.png",
    titleKey: "orchestrator",
    width: 1440,
    height: 900,
  },
  {
    src: "/projects/sous-chef/10-settings.png",
    titleKey: "settings",
    width: 1440,
    height: 900,
  },
  {
    src: "/projects/sous-chef/11-architecture.png",
    titleKey: "architecture",
    width: 1440,
    height: 900,
  },
];

type LocalizedScreenshotCopy = {
  landing: { title: string; caption: string };
  dashboard: { title: string; caption: string };
  recipeNew: { title: string; caption: string };
  recipeDetail: { title: string; caption: string };
  miseEnPlace: { title: string; caption: string };
  serviceDrawer: { title: string; caption: string };
  serviceTimeline: { title: string; caption: string };
  inventory: { title: string; caption: string };
  techniques: { title: string; caption: string };
  orchestrator: { title: string; caption: string };
  settings: { title: string; caption: string };
  architecture: { title: string; caption: string };
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
    title: "Sous-Chef AI",
    eyebrow: "Pydantic AI meal prep assistant",
    description:
      "Sous-Chef AI is a Pydantic AI-powered meal prep assistant that treats recipes as a Directed Acyclic Graph of tasks — not a flat list. It generates parallelized Service Plans with mise en place gating, passive/active scheduling, and bilingual support.",
    walkthroughTitle: "Product walkthrough",
    walkthroughDescription:
      "Screens from a Coq au Vin and Mushroom Risotto demo: import recipes, parse them into DAG steps, generate a parallel timeline, run mise en place, and cook with live chef nudges.",
    highlightsTitle: "Project highlights",
    backToPortfolio: "Back to portfolio",
    highlights: [
      "DAG-based scheduling with topological sort, critical path validation, and passive/active parallelization.",
      "Two Pydantic AI agents — Parser (recipe to structured steps) and Timeline (Master Service Plan) — with Python validation via ModelRetry.",
      "Local Ollama vs Claude cloud boost toggle for privacy-first family recipes or complex multi-course planning.",
    ],
    screenshots: {
      landing: {
        title: "Landing page",
        caption:
          "Marketing entry point highlighting parallel scheduling, mise en place gating, and local-first privacy.",
      },
      dashboard: {
        title: "Kitchen dashboard",
        caption:
          "Recipe cards for Coq au Vin and Mushroom Risotto with step counts, durations, and active service status.",
      },
      recipeNew: {
        title: "Import recipe",
        caption:
          "Paste recipe text or a URL and parse it with AI into structured ingredients and DAG steps.",
      },
      recipeDetail: {
        title: "Recipe detail",
        caption:
          "Ingredients table, dependency-linked steps, and actions to generate a Service Plan or start mise en place.",
      },
      miseEnPlace: {
        title: "Mise en place",
        caption:
          "Prep checklist gates service start — complete all prep tasks before the live cooking timeline begins.",
      },
      serviceDrawer: {
        title: "Technique drawer",
        caption:
          "During live service, open the technique drawer for the active step with a Serious Eats search link and step context.",
      },
      serviceTimeline: {
        title: "Service timeline",
        caption:
          "Gantt-style view with real clock times, parallel tasks, passive braising windows, and Chef Says nudges.",
      },
      inventory: {
        title: "Inventory management",
        caption:
          "Aggregated shopping lists grouped by aisle across multiple recipes in the kitchen.",
      },
      techniques: {
        title: "Technique library",
        caption:
          "Saved technique search queries per recipe step for quick reference while cooking.",
      },
      orchestrator: {
        title: "AI orchestration",
        caption:
          "Toggle Local Mode (Ollama) for on-device parsing or Cloud Boost (Claude) for complex timelines.",
      },
      settings: {
        title: "System settings",
        caption:
          "Display name, language preference, and account controls with next-intl localization.",
      },
      architecture: {
        title: "Architecture explainer",
        caption:
          "In-app diagram of the dependency problem: critical path, passive work, and why DAG scheduling beats flat lists.",
      },
    },
  },
  es: {
    title: "Sous-Chef AI",
    eyebrow: "Asistente de preparacion con Pydantic AI",
    description:
      "Sous-Chef AI es un asistente de preparacion de comidas impulsado por Pydantic AI que trata las recetas como un Grafo Aciclico Dirigido de tareas — no como una lista plana. Genera planes de servicio paralelizados con control de mise en place, programacion pasiva/activa y soporte bilingue.",
    walkthroughTitle: "Recorrido del producto",
    walkthroughDescription:
      "Capturas de una demo de Coq au Vin y Risotto de Hongos: importar recetas, parsearlas en pasos DAG, generar una linea de tiempo paralela, ejecutar mise en place y cocinar con avisos en vivo del chef.",
    highlightsTitle: "Aspectos destacados",
    backToPortfolio: "Volver al portfolio",
    highlights: [
      "Programacion basada en DAG con orden topologico, validacion de ruta critica y paralelizacion pasiva/activa.",
      "Dos agentes Pydantic AI — Parser (receta a pasos estructurados) y Timeline (plan maestro de servicio) — con validacion Python via ModelRetry.",
      "Alternancia entre Ollama local y Claude en la nube para recetas familiares privadas o planificacion multi-plato compleja.",
    ],
    screenshots: {
      landing: {
        title: "Pagina de inicio",
        caption:
          "Punto de entrada que destaca programacion paralela, control de mise en place y privacidad local-first.",
      },
      dashboard: {
        title: "Panel de cocina",
        caption:
          "Tarjetas de recetas para Coq au Vin y Risotto de Hongos con conteo de pasos, duraciones y estado de servicio activo.",
      },
      recipeNew: {
        title: "Importar receta",
        caption:
          "Pega texto de receta o una URL y parseala con IA en ingredientes y pasos DAG estructurados.",
      },
      recipeDetail: {
        title: "Detalle de receta",
        caption:
          "Tabla de ingredientes, pasos con dependencias y acciones para generar un plan de servicio o iniciar mise en place.",
      },
      miseEnPlace: {
        title: "Mise en place",
        caption:
          "Lista de preparacion bloquea el inicio del servicio — completa todas las tareas de prep antes de la linea de tiempo en vivo.",
      },
      serviceDrawer: {
        title: "Panel de tecnica",
        caption:
          "Durante el servicio en vivo, abre el panel de tecnica del paso activo con enlace de busqueda en Serious Eats y contexto del paso.",
      },
      serviceTimeline: {
        title: "Linea de tiempo de servicio",
        caption:
          "Vista estilo Gantt con horarios reales, tareas paralelas, ventanas de coccion pasiva y avisos del chef.",
      },
      inventory: {
        title: "Gestion de inventario",
        caption:
          "Listas de compras agregadas por pasillo entre multiples recetas en la cocina.",
      },
      techniques: {
        title: "Biblioteca de tecnicas",
        caption:
          "Consultas de busqueda de tecnicas guardadas por paso de receta para referencia rapida mientras cocinas.",
      },
      orchestrator: {
        title: "Orquestacion IA",
        caption:
          "Alterna Modo Local (Ollama) para parseo en dispositivo o Cloud Boost (Claude) para lineas de tiempo complejas.",
      },
      settings: {
        title: "Configuracion del sistema",
        caption:
          "Nombre para mostrar, preferencia de idioma y controles de cuenta con localizacion next-intl.",
      },
      architecture: {
        title: "Explicacion de arquitectura",
        caption:
          "Diagrama en la app del problema de dependencias: ruta critica, trabajo pasivo y por que el DAG supera listas planas.",
      },
    },
  },
  pt: {
    title: "Sous-Chef AI",
    eyebrow: "Assistente de preparo com Pydantic AI",
    description:
      "Sous-Chef AI e um assistente de preparo de refeicoes com Pydantic AI que trata receitas como um Grafo Aciclico Dirigido de tarefas — nao como uma lista plana. Gera planos de servico paralelizados com controle de mise en place, agendamento passivo/ativo e suporte bilíngue.",
    walkthroughTitle: "Tour pelo produto",
    walkthroughDescription:
      "Capturas de uma demo de Coq au Vin e Risotto de Cogumelos: importar receitas, parsear em passos DAG, gerar uma linha do tempo paralela, executar mise en place e cozinhar com avisos ao vivo do chef.",
    highlightsTitle: "Destaques do projeto",
    backToPortfolio: "Voltar ao portfolio",
    highlights: [
      "Agendamento baseado em DAG com ordenacao topologica, validacao de caminho critico e paralelizacao passiva/ativa.",
      "Dois agentes Pydantic AI — Parser (receita para passos estruturados) e Timeline (plano mestre de servico) — com validacao Python via ModelRetry.",
      "Alternancia entre Ollama local e Claude em nuvem para receitas familiares privadas ou planejamento multi-prato complexo.",
    ],
    screenshots: {
      landing: {
        title: "Pagina inicial",
        caption:
          "Ponto de entrada destacando agendamento paralelo, controle de mise en place e privacidade local-first.",
      },
      dashboard: {
        title: "Painel da cozinha",
        caption:
          "Cartoes de receitas para Coq au Vin e Risotto de Cogumelos com contagem de passos, duracoes e status de servico ativo.",
      },
      recipeNew: {
        title: "Importar receita",
        caption:
          "Cole texto de receita ou uma URL e parseie com IA em ingredientes e passos DAG estruturados.",
      },
      recipeDetail: {
        title: "Detalhe da receita",
        caption:
          "Tabela de ingredientes, passos com dependencias e acoes para gerar um plano de servico ou iniciar mise en place.",
      },
      miseEnPlace: {
        title: "Mise en place",
        caption:
          "Checklist de preparo bloqueia o inicio do servico — complete todas as tarefas de prep antes da linha do tempo ao vivo.",
      },
      serviceDrawer: {
        title: "Painel de tecnica",
        caption:
          "Durante o servico ao vivo, abra o painel de tecnica do passo ativo com link de busca no Serious Eats e contexto do passo.",
      },
      serviceTimeline: {
        title: "Linha do tempo de servico",
        caption:
          "Visao estilo Gantt com horarios reais, tarefas paralelas, janelas de cozimento passivo e avisos do chef.",
      },
      inventory: {
        title: "Gestao de inventario",
        caption:
          "Listas de compras agregadas por corredor entre multiplas receitas na cozinha.",
      },
      techniques: {
        title: "Biblioteca de tecnicas",
        caption:
          "Consultas de busca de tecnicas salvas por passo de receita para referencia rapida durante o cozimento.",
      },
      orchestrator: {
        title: "Orquestracao IA",
        caption:
          "Alterne Modo Local (Ollama) para parse local ou Cloud Boost (Claude) para linhas do tempo complexas.",
      },
      settings: {
        title: "Configuracoes do sistema",
        caption:
          "Nome de exibicao, preferencia de idioma e controles de conta com localizacao next-intl.",
      },
      architecture: {
        title: "Explicacao de arquitetura",
        caption:
          "Diagrama no app do problema de dependencias: caminho critico, trabalho passivo e por que DAG supera listas planas.",
      },
    },
  },
};

function languageAlternatesForProject(): Record<string, string> {
  return {
    en: absoluteUrl("/en/projects/sous-chef"),
    es: absoluteUrl("/es/projects/sous-chef"),
    pt: absoluteUrl("/pt/projects/sous-chef"),
    "x-default": absoluteUrl("/en/projects/sous-chef"),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const copy = projectCopy[loc] ?? projectCopy.en;
  const pageUrl = absoluteUrl(`/${loc}/projects/sous-chef`);
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

export default async function SousChefProjectPage({ params }: Props) {
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
          aria-labelledby="sous-chef-walkthrough-heading"
          className="flex flex-col gap-8"
        >
          <div className="space-y-2">
            <h2
              className="font-headline text-2xl font-semibold"
              id="sous-chef-walkthrough-heading"
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
                    height={screenshot.height}
                    sizes="(min-width: 1024px) 896px, 100vw"
                    src={screenshot.src}
                    width={screenshot.width}
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
