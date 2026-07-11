import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { BottomNav } from "@/app/components/bottom-nav";
import { Card, Logo } from "@/app/components/ui";
import { AiCoach } from "@/app/components/ai-coach";
import { QUOTES } from "@/app/data/nutrition";
import { Apple } from "lucide-react";
import { DashboardStreak } from "./streak-chain";
import { DashboardLinks } from "./dashboard-links";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();

  if (!claims?.claims) {
    redirect("/login");
  }

  const userId = claims.claims.sub as string;

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, streak, units, selected_plan_id, selected_plan_location")
    .eq("id", userId)
    .single();

  const { data: weightRows } = await supabase
    .from("weight_logs")
    .select("weight, logged_at")
    .eq("user_id", userId)
    .order("logged_at", { ascending: true });

  const first = weightRows?.[0]?.weight;
  const last = weightRows?.[weightRows.length - 1]?.weight;
  const diff = first !== undefined && last !== undefined ? last - first : 0;
  const unit = profile?.units === "kg" ? "kg" : "lb";
  const trendLabel = diff < 0 ? "lost" : diff > 0 ? "gained" : "maintained";

  const quoteOfDay = QUOTES[new Date().getDate() % QUOTES.length];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, maxWidth: 480, margin: "0 auto", width: "100%", padding: "20px 18px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <Logo size={26} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15 }}>
            Teenfit Tracker
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <p style={{ color: "var(--text-dim)", fontSize: 14, margin: 0 }}>Welcome back,</p>
            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 28,
                fontWeight: 700,
                margin: "2px 0 0",
              }}
            >
              {profile?.name ?? "Athlete"}
            </h1>
          </div>

          <DashboardStreak streak={profile?.streak ?? 0} />

          <DashboardLinks
            selectedPlanId={profile?.selected_plan_id ?? null}
            selectedPlanLocation={profile?.selected_plan_location ?? null}
            trendLabel={trendLabel}
            diff={diff}
            unit={unit}
          />

          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: "rgba(139,92,246,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Apple size={14} color="var(--accent-bright)" />
              </div>
              <p
                style={{
                  color: "var(--text-dim)",
                  fontSize: 12,
                  margin: 0,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                Today&apos;s tip
              </p>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.5, margin: 0, fontStyle: "italic" }}>
              &quot;{quoteOfDay}&quot;
            </p>
          </Card>

          <AiCoach />
        </div>
      </div>

      <div style={{ maxWidth: 480, margin: "0 auto", width: "100%" }}>
        <BottomNav />
      </div>
    </div>
  );
}
