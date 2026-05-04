import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { HireRequest } from "@/types/portfolio";

export async function getHireRequests(): Promise<HireRequest[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("hire_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data as HireRequest[];
}
