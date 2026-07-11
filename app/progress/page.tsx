import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { BottomNav } from "@/app/components/bottom-nav";
import { Logo } from "@/app/components/ui";
import { ProgressClient } from "./progress-client";

export default async function ProgressPage() {
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();

  if (!claims?.claims) {
    redirect("/login");
  }

  const userId = claims.claims.sub as string;

  const { data: profile } = await supabase
    .from("profiles")
    .select("units")
    .eq("id", userId)
    .single();

  const { data: weightRows } = await supabase
    .from("weight_logs")
    .select("id, weight, logged_at")
    .eq("user_id", userId)
    .order("logged_at", { ascending: true });

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, maxWidth: 480, margin: "0 auto", width: "100%", padding: "20px 18px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <Logo size={26} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15 }}>
            Teenfit Tracker
          </span>
        </div>

        <ProgressClient
          initialUnits={profile?.units === "kg" ? "kg" : "lb"}
          initialLog={weightRows ?? []}
        />
      </div>

      <div style={{ maxWidth: 480, margin: "0 auto", width: "100%" }}>
        <BottomNav />
      </div>
    </div>
  );
}
