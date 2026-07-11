"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addWeightEntry(weight: number) {
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();

  if (!claims?.claims) return { error: "Not signed in" };

  const userId = claims.claims.sub as string;

  const { error } = await supabase.from("weight_logs").insert({
    user_id: userId,
    weight,
  });

  if (error) return { error: error.message };

  revalidatePath("/progress");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function toggleUnits(currentUnits: "lb" | "kg") {
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();

  if (!claims?.claims) return { error: "Not signed in" };

  const userId = claims.claims.sub as string;
  const newUnits = currentUnits === "lb" ? "kg" : "lb";

  const { error } = await supabase
    .from("profiles")
    .update({ units: newUnits })
    .eq("id", userId);

  if (error) return { error: error.message };

  revalidatePath("/progress");
  revalidatePath("/dashboard");
  return { success: true, units: newUnits };
}
