import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { BottomNav } from "@/app/components/bottom-nav";
import { Logo } from "@/app/components/ui";
import { WorkoutsClient } from "./workouts-client";

export default async function WorkoutsPage() {
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();

  if (!claims?.claims) {
    redirect("/login");
  }

  const userId = claims.claims.sub as string;

  const { data: profile } = await supabase
    .from("profiles")
    .select("selected_plan_id, selected_plan_location")
    .eq("id", userId)
    .single();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, maxWidth: 480, margin: "0 auto", width: "100%", padding: "20px 18px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <Logo size={26} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15 }}>
            Teenfit Tracker
          </span>
        </div>

        <WorkoutsClient
          selectedPlanId={profile?.selected_plan_id ?? null}
          selectedPlanLocation={profile?.selected_plan_location ?? null}
        />
      </div>

      <div style={{ maxWidth: 480, margin: "0 auto", width: "100%" }}>
        <BottomNav />
      </div>
    </div>
  );
}
