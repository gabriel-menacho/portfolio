import type { LocalizedText } from "@/lib/i18n-content";

export type Profile = {
  id: number;
  display_name: LocalizedText;
  headline: LocalizedText;
  bio: LocalizedText;
  role_label: LocalizedText;
  email: string;
  phone: string;
  location: LocalizedText;
  avatar_path: string | null;
  resume_override_path: string | null;
  social_github: string | null;
  social_linkedin: string | null;
  show_home_projects_section: boolean;
};

export type StackGroup = {
  id: string;
  title: LocalizedText;
  slug: string;
  grid_class: string;
  variant: string;
  sort_order: number;
};

export type Technology = {
  id: string;
  stack_group_id: string;
  name: string;
  sort_order: number;
};

export type Experience = {
  id: string;
  company_name: string;
  company_logo_path: string | null;
  role_title: LocalizedText;
  description: LocalizedText;
  start_date: string;
  end_date: string | null;
  sort_order: number;
  show_on_site: boolean;
  tags: { label: string }[];
};

export type Project = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  url: string | null;
  repo_url: string | null;
  image_path: string | null;
  sort_order: number;
  show_on_site: boolean;
  tags: { label: string }[];
};

export type HireRequest = {
  id: string;
  recruiter_email: string;
  recruiter_name: string | null;
  company: string | null;
  job_title: string;
  employment_type: string | null;
  job_location: string | null;
  is_remote: boolean;
  salary_range: string | null;
  job_description: string;
  message: string | null;
  locale: string | null;
  user_agent: string | null;
  created_at: string;
};
