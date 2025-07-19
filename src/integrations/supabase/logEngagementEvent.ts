import { supabase } from "./client";
import type { TablesInsert } from "./types";

/**
 * Logs an engagement event to Supabase.
 * @param event Partial<engagement_logs Insert> (activity_type required)
 * @returns Supabase insert result
 */
export async function logEngagementEvent(event: TablesInsert<"engagement_logs">) {
  return supabase.from("engagement_logs").insert([event]);
} 