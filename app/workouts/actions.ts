"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function selectPlan(planId: string, location: "gym" | "home") {
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();

  if (!claims?.claims) return { error: "Not signed in" };

  const userId = claims.claims.sub as string;

  const { error } = await supabase
    .from("profiles")
    .update({ selected_plan_id: planId, selected_plan_location: location })
    .eq("id", userId);

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  revalidatePath("/workouts");
  return { success: true };
}
