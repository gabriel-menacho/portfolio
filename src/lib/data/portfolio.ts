import "server-only";

import { createClient } from "@/lib/supabase/server";
import type {
  Experience,
  Profile,
  Project,
  StackGroup,
  Technology,
} from "@/types/portfolio";

export type { Experience, Profile, Project, StackGroup, Technology };

export async function getProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", 1)
    .maybeSingle();
  if (error || !data) return null;
  return data as Profile;
}

export async function getStack(): Promise<
  { group: StackGroup; technologies: Technology[] }[]
> {
  const supabase = await createClient();
  const { data: groups, error: gErr } = await supabase
    .from("stack_groups")
    .select("*")
    .order("sort_order", { ascending: true });
  if (gErr || !groups) return [];
  const { data: techs, error: tErr } = await supabase
    .from("technologies")
    .select("*")
    .order("sort_order", { ascending: true });
  if (tErr || !techs) return [];

  const typedGroups = groups as StackGroup[];
  const typedTechs = techs as Technology[];

  return typedGroups.map((group) => ({
    group,
    technologies: typedTechs.filter((t) => t.stack_group_id === group.id),
  }));
}

export async function getExperiences(): Promise<Experience[]> {
  const supabase = await createClient();
  const { data: rows, error } = await supabase
    .from("experiences")
    .select(
      `
      *,
      experience_technology_tags ( label, sort_order )
    `,
    )
    .order("sort_order", { ascending: true });
  if (error || !rows) return [];

  return (rows as unknown as Array<Record<string, unknown>>).map((row) => {
    const { experience_technology_tags, ...rest } = row as Record<
      string,
      unknown
    >;
    const tags =
      (experience_technology_tags as { label: string; sort_order: number }[])
        ?.slice()
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((t) => ({ label: t.label })) ?? [];
    return { ...(rest as Omit<Experience, "tags">), tags };
  });
}

export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data: rows, error } = await supabase
    .from("projects")
    .select(
      `
      *,
      project_technology_tags ( label, sort_order )
    `,
    )
    .order("sort_order", { ascending: true });
  if (error || !rows) return [];

  return (rows as unknown as Array<Record<string, unknown>>).map((row) => {
    const { project_technology_tags, ...rest } = row as Record<string, unknown>;
    const tags =
      (project_technology_tags as { label: string; sort_order: number }[])
        ?.slice()
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((t) => ({ label: t.label })) ?? [];
    return { ...(rest as Omit<Project, "tags">), tags };
  });
}
