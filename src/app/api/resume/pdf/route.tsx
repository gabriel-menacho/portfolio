import { pdf } from "@react-pdf/renderer";
import { NextResponse } from "next/server";
import {
  getExperiences,
  getProfile,
  getProjects,
  getStack,
} from "@/lib/data/portfolio";
import { pickLocalized } from "@/lib/i18n-content";
import type { Locale } from "@/i18n/routing";
import { ResumePdfDocument } from "@/lib/resume/resume-document";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = (searchParams.get("locale") ?? "en") as Locale;

  const profile = await getProfile();
  const stack = await getStack();
  const experiences = await getExperiences();
  const projects = await getProjects();

  const name =
    pickLocalized(profile?.display_name ?? null, locale) || "Profile";
  const headline = pickLocalized(profile?.headline ?? null, locale) || "";
  const summary = pickLocalized(profile?.bio ?? null, locale) || "";
  const email = profile?.email ?? "";

  const skillLines = stack.map(({ group, technologies }) => {
    const title = pickLocalized(group.title, locale);
    const names = technologies.map((t) => t.name).join(", ");
    return `${title}: ${names}`;
  });

  const expPdf = experiences.map((exp) => ({
    company: exp.company_name,
    range: `${exp.start_date} — ${exp.end_date ?? ""}`,
    title: pickLocalized(exp.role_title, locale),
    body: pickLocalized(exp.description, locale),
    skills: exp.tags.map((t) => t.label).join(", "),
  }));

  const projPdf = projects.map((p) => ({
    title: pickLocalized(p.title, locale),
    body: pickLocalized(p.description, locale),
    skills: p.tags.map((t) => t.label).join(", "),
  }));

  const doc = (
    <ResumePdfDocument
      email={email}
      experiences={expPdf}
      headline={headline}
      name={name}
      projects={projPdf}
      skillLines={skillLines}
      summary={summary}
    />
  );

  const instance = pdf(doc);
  const body = await instance.toBuffer();
  const arrayBuffer = await new Response(
    body as unknown as ReadableStream,
  ).arrayBuffer();

  return new NextResponse(arrayBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="resume.pdf"',
      "Cache-Control": "no-store",
    },
  });
}
