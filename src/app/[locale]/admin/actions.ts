"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import type { ProfileActionState } from "@/app/[locale]/admin/profile-action-state";

function localized(formData: FormData, key: string) {
  return {
    en: String(formData.get(`${key}.en`) ?? ""),
    es: String(formData.get(`${key}.es`) ?? ""),
    pt: String(formData.get(`${key}.pt`) ?? ""),
  };
}

function formCheckboxOn(formData: FormData, name: string) {
  return formData.get(name) === "on";
}

function mapProfileActionError(
  e: unknown,
  t: Awaited<ReturnType<typeof getTranslations>>,
): string {
  const fallback = t("admin.formErrors.generic");
  if (!e || typeof e !== "object") return fallback;
  const rec = e as Record<string, unknown>;
  const message =
    typeof rec.message === "string" ? rec.message.toLowerCase() : "";
  const code = typeof rec.code === "string" ? rec.code : "";

  if (
    code === "42501" ||
    message.includes("permission denied") ||
    message.includes("row-level security")
  ) {
    return t("admin.formErrors.permission");
  }
  if (
    code.startsWith("22") ||
    code === "23502" ||
    code === "23514" ||
    message.includes("violates check constraint")
  ) {
    return t("admin.formErrors.validation");
  }
  if (
    message.includes("jwt") ||
    message.includes("not authenticated") ||
    message.includes("invalid login")
  ) {
    return t("admin.formErrors.session");
  }
  return fallback;
}

export async function signOut(locale: string) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect(`/${locale}`);
}

export async function updateProfile(
  _prev: ProfileActionState,
  formData: FormData,
): Promise<ProfileActionState> {
  const locale = String(formData.get("locale") ?? "en");
  const t = await getTranslations({ locale });
  try {
    const supabase = await createClient();
    const payload = {
      display_name: localized(formData, "display_name"),
      headline: localized(formData, "headline"),
      bio: localized(formData, "bio"),
      role_label: localized(formData, "role_label"),
      location: localized(formData, "location"),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      social_github: String(formData.get("social_github") ?? ""),
      social_linkedin: String(formData.get("social_linkedin") ?? ""),
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("profile")
      .update(payload)
      .eq("id", 1);
    if (error) throw error;
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/admin/profile`);
    return { error: null };
  } catch (e) {
    return { error: mapProfileActionError(e, t) };
  }
}

export async function uploadAvatar(
  _prev: ProfileActionState,
  formData: FormData,
): Promise<ProfileActionState> {
  const locale = String(formData.get("locale") ?? "en");
  const t = await getTranslations({ locale });
  const file = formData.get("avatar") as File | null;
  if (!file || file.size === 0) {
    return { error: t("admin.formErrors.noImage") };
  }

  try {
    const supabase = await createClient();
    const safeName = file.name.replace(/\s+/g, "-");
    const objectPath = `${randomUUID()}-${safeName}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(objectPath, buffer, { contentType: file.type, upsert: true });
    if (uploadError) throw uploadError;

    const storagePath = `avatars/${objectPath}`;
    const { error } = await supabase
      .from("profile")
      .update({
        avatar_path: storagePath,
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1);
    if (error) throw error;
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/admin/profile`);
    return { error: null };
  } catch (e) {
    return { error: mapProfileActionError(e, t) };
  }
}

export async function uploadResumeOverride(
  _prev: ProfileActionState,
  formData: FormData,
): Promise<ProfileActionState> {
  const locale = String(formData.get("locale") ?? "en");
  const t = await getTranslations({ locale });
  const file = formData.get("resume") as File | null;
  if (!file || file.size === 0) {
    return { error: t("admin.formErrors.noPdf") };
  }

  try {
    const supabase = await createClient();
    const objectPath = `${randomUUID()}.pdf`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from("resumes")
      .upload(objectPath, buffer, {
        contentType: "application/pdf",
        upsert: true,
      });
    if (uploadError) throw uploadError;

    const storagePath = `resumes/${objectPath}`;
    const { error } = await supabase
      .from("profile")
      .update({
        resume_override_path: storagePath,
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1);
    if (error) throw error;
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/admin/profile`);
    return { error: null };
  } catch (e) {
    return { error: mapProfileActionError(e, t) };
  }
}

export async function clearResumeOverride(
  _prev: ProfileActionState,
  formData: FormData,
): Promise<ProfileActionState> {
  const locale = String(formData.get("locale") ?? "en");
  const t = await getTranslations({ locale });
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("profile")
      .update({
        resume_override_path: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1);
    if (error) throw error;
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/admin/profile`);
    return { error: null };
  } catch (e) {
    return { error: mapProfileActionError(e, t) };
  }
}

export async function createStackGroup(formData: FormData) {
  const locale = String(formData.get("locale") ?? "en");
  const supabase = await createClient();
  const payload = {
    slug: String(formData.get("slug") ?? "").trim(),
    title: localized(formData, "title"),
    grid_class: String(formData.get("grid_class") ?? "md:col-span-2"),
    variant: String(formData.get("variant") ?? "default"),
    sort_order: Number(formData.get("sort_order") ?? 0),
  };
  if (!payload.slug) return;

  const { error } = await supabase.from("stack_groups").insert(payload);
  if (error) throw error;
  revalidatePath(`/${locale}`);
  revalidatePath(`/${locale}/admin/stack`);
}

export async function updateStackGroup(formData: FormData) {
  const locale = String(formData.get("locale") ?? "en");
  const id = String(formData.get("id") ?? "");
  const slug = String(formData.get("slug") ?? "").trim();
  if (!id || !slug) return;

  const supabase = await createClient();
  const payload = {
    slug,
    title: localized(formData, "title"),
    grid_class: String(formData.get("grid_class") ?? "md:col-span-2"),
    variant: String(formData.get("variant") ?? "default"),
    sort_order: Number(formData.get("sort_order") ?? 0),
  };

  const { error } = await supabase
    .from("stack_groups")
    .update(payload)
    .eq("id", id);
  if (error) throw error;
  revalidatePath(`/${locale}`);
  revalidatePath(`/${locale}/admin/stack`);
}

export async function deleteStackGroup(formData: FormData) {
  const locale = String(formData.get("locale") ?? "en");
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const supabase = await createClient();
  const { error } = await supabase.from("stack_groups").delete().eq("id", id);
  if (error) throw error;
  revalidatePath(`/${locale}`);
  revalidatePath(`/${locale}/admin/stack`);
}

export async function createTechnology(formData: FormData) {
  const locale = String(formData.get("locale") ?? "en");
  const supabase = await createClient();
  const payload = {
    stack_group_id: String(formData.get("stack_group_id") ?? ""),
    name: String(formData.get("name") ?? "").trim(),
    sort_order: Number(formData.get("sort_order") ?? 0),
  };
  if (!payload.stack_group_id || !payload.name) return;

  const { error } = await supabase.from("technologies").insert(payload);
  if (error) throw error;
  revalidatePath(`/${locale}`);
  revalidatePath(`/${locale}/admin/stack`);
}

export async function updateTechnology(formData: FormData) {
  const locale = String(formData.get("locale") ?? "en");
  const id = String(formData.get("id") ?? "");
  const stack_group_id = String(formData.get("stack_group_id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  if (!id || !stack_group_id || !name) return;

  const supabase = await createClient();
  const { error } = await supabase
    .from("technologies")
    .update({
      stack_group_id,
      name,
      sort_order: Number(formData.get("sort_order") ?? 0),
    })
    .eq("id", id);
  if (error) throw error;
  revalidatePath(`/${locale}`);
  revalidatePath(`/${locale}/admin/stack`);
}

export async function deleteTechnology(formData: FormData) {
  const locale = String(formData.get("locale") ?? "en");
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const supabase = await createClient();
  const { error } = await supabase.from("technologies").delete().eq("id", id);
  if (error) throw error;
  revalidatePath(`/${locale}`);
  revalidatePath(`/${locale}/admin/stack`);
}

export async function createExperience(formData: FormData) {
  const locale = String(formData.get("locale") ?? "en");
  const supabase = await createClient();

  const company_name = String(formData.get("company_name") ?? "").trim();
  if (!company_name) return;

  const { data, error } = await supabase
    .from("experiences")
    .insert({
      company_name,
      company_logo_path:
        String(formData.get("company_logo_path") ?? "").trim() || null,
      role_title: localized(formData, "role_title"),
      description: localized(formData, "description"),
      start_date: String(formData.get("start_date") ?? ""),
      end_date: String(formData.get("end_date") ?? "") || null,
      sort_order: Number(formData.get("sort_order") ?? 0),
      show_on_site: formCheckboxOn(formData, "show_on_site"),
    })
    .select("id")
    .single();

  if (error) throw error;

  const tags = String(formData.get("tags") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (tags.length > 0 && data?.id) {
    const rows = tags.map((label, idx) => ({
      experience_id: data.id,
      label,
      sort_order: idx,
    }));
    const { error: tagError } = await supabase
      .from("experience_technology_tags")
      .insert(rows);
    if (tagError) throw tagError;
  }

  revalidatePath(`/${locale}`);
  revalidatePath(`/${locale}/admin/experiences`);
}

export async function updateExperience(formData: FormData) {
  const locale = String(formData.get("locale") ?? "en");
  const id = String(formData.get("id") ?? "");
  const company_name = String(formData.get("company_name") ?? "").trim();
  if (!id || !company_name) return;

  const supabase = await createClient();
  const { error } = await supabase
    .from("experiences")
    .update({
      company_name,
      company_logo_path:
        String(formData.get("company_logo_path") ?? "").trim() || null,
      role_title: localized(formData, "role_title"),
      description: localized(formData, "description"),
      start_date: String(formData.get("start_date") ?? ""),
      end_date: String(formData.get("end_date") ?? "") || null,
      sort_order: Number(formData.get("sort_order") ?? 0),
      show_on_site: formCheckboxOn(formData, "show_on_site"),
    })
    .eq("id", id);
  if (error) throw error;

  const { error: delErr } = await supabase
    .from("experience_technology_tags")
    .delete()
    .eq("experience_id", id);
  if (delErr) throw delErr;

  const tags = String(formData.get("tags") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (tags.length > 0) {
    const rows = tags.map((label, idx) => ({
      experience_id: id,
      label,
      sort_order: idx,
    }));
    const { error: tagError } = await supabase
      .from("experience_technology_tags")
      .insert(rows);
    if (tagError) throw tagError;
  }

  revalidatePath(`/${locale}`);
  revalidatePath(`/${locale}/admin/experiences`);
}

export async function setExperienceShowOnSite(formData: FormData) {
  const locale = String(formData.get("locale") ?? "en");
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createClient();
  const { error } = await supabase
    .from("experiences")
    .update({ show_on_site: formCheckboxOn(formData, "show_on_site") })
    .eq("id", id);
  if (error) throw error;

  revalidatePath(`/${locale}`);
  revalidatePath(`/${locale}/admin/experiences`);
}

export async function deleteExperience(formData: FormData) {
  const locale = String(formData.get("locale") ?? "en");
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const supabase = await createClient();
  const { error } = await supabase.from("experiences").delete().eq("id", id);
  if (error) throw error;
  revalidatePath(`/${locale}`);
  revalidatePath(`/${locale}/admin/experiences`);
}

export async function createProject(formData: FormData) {
  const locale = String(formData.get("locale") ?? "en");
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .insert({
      title: localized(formData, "title"),
      description: localized(formData, "description"),
      url: String(formData.get("url") ?? "").trim() || null,
      repo_url: String(formData.get("repo_url") ?? "").trim() || null,
      image_path: String(formData.get("image_path") ?? "").trim() || null,
      sort_order: Number(formData.get("sort_order") ?? 0),
      show_on_site: formCheckboxOn(formData, "show_on_site"),
    })
    .select("id")
    .single();

  if (error) throw error;

  const tags = String(formData.get("tags") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (tags.length > 0 && data?.id) {
    const rows = tags.map((label, idx) => ({
      project_id: data.id,
      label,
      sort_order: idx,
    }));
    const { error: tagError } = await supabase
      .from("project_technology_tags")
      .insert(rows);
    if (tagError) throw tagError;
  }

  revalidatePath(`/${locale}`);
  revalidatePath(`/${locale}/admin/projects`);
}

export async function updateProject(formData: FormData) {
  const locale = String(formData.get("locale") ?? "en");
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createClient();
  const { error } = await supabase
    .from("projects")
    .update({
      title: localized(formData, "title"),
      description: localized(formData, "description"),
      url: String(formData.get("url") ?? "").trim() || null,
      repo_url: String(formData.get("repo_url") ?? "").trim() || null,
      image_path: String(formData.get("image_path") ?? "").trim() || null,
      sort_order: Number(formData.get("sort_order") ?? 0),
      show_on_site: formCheckboxOn(formData, "show_on_site"),
    })
    .eq("id", id);
  if (error) throw error;

  const { error: delErr } = await supabase
    .from("project_technology_tags")
    .delete()
    .eq("project_id", id);
  if (delErr) throw delErr;

  const tags = String(formData.get("tags") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (tags.length > 0) {
    const rows = tags.map((label, idx) => ({
      project_id: id,
      label,
      sort_order: idx,
    }));
    const { error: tagError } = await supabase
      .from("project_technology_tags")
      .insert(rows);
    if (tagError) throw tagError;
  }

  revalidatePath(`/${locale}`);
  revalidatePath(`/${locale}/admin/projects`);
}

export async function setHomeProjectsSectionVisible(formData: FormData) {
  const locale = String(formData.get("locale") ?? "en");
  const supabase = await createClient();
  const { error } = await supabase
    .from("profile")
    .update({
      show_home_projects_section: formCheckboxOn(formData, "show_on_site"),
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);
  if (error) throw error;

  revalidatePath(`/${locale}`);
  revalidatePath(`/${locale}/admin/projects`);
}

export async function setProjectShowOnSite(formData: FormData) {
  const locale = String(formData.get("locale") ?? "en");
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createClient();
  const { error } = await supabase
    .from("projects")
    .update({ show_on_site: formCheckboxOn(formData, "show_on_site") })
    .eq("id", id);
  if (error) throw error;

  revalidatePath(`/${locale}`);
  revalidatePath(`/${locale}/admin/projects`);
}

export async function deleteProject(formData: FormData) {
  const locale = String(formData.get("locale") ?? "en");
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw error;
  revalidatePath(`/${locale}`);
  revalidatePath(`/${locale}/admin/projects`);
}
