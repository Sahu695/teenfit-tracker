"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/app/components/ui";
import { Building2, Home } from "lucide-react";

export function DashboardLinks({
  selectedPlanId,
  selectedPlanLocation,
  trendLabel,
  diff,
  unit,
}: {
  selectedPlanId: string | null;
  selectedPlanLocation: "gym" | "home" | null;
  trendLabel: string;
  diff: number;
  unit: string;
}) {
  const router = useRouter();
  const diffDisplay = Math.abs(diff).toFixed(1);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      <Card onClick={() => router.push("/workouts")} style={{ padding: 16 }}>
        <p
          style={{
            color: "var(--text-dim)",
            fontSize: 11.5,
            margin: "0 0 6px",
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          Selected workout
        </p>
        {selectedPlanId ? (
          <>
            <p style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>
              {selectedPlanId} plan
            </p>
            <p
              style={{
                color: "var(--text-faint)",
                fontSize: 12,
                margin: "4px 0 0",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              {selectedPlanLocation === "home" ? <Home size={12} /> : <Building2 size={12} />}
              {selectedPlanLocation === "home" ? "Home version" : "Gym version"}
            </p>
          </>
        ) : (
          <p style={{ color: "var(--text-faint)", fontSize: 13, margin: 0 }}>Tap to pick a plan</p>
        )}
      </Card>

      <Card onClick={() => router.push("/progress")} style={{ padding: 16 }}>
        <p
          style={{
            color: "var(--text-dim)",
            fontSize: 11.5,
            margin: "0 0 6px",
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          Total {trendLabel}
        </p>
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 22,
            fontWeight: 700,
            margin: 0,
          }}
        >
          {diff === 0 ? "—" : `${diffDisplay} ${unit}`}
        </p>
        <p style={{ color: "var(--text-faint)", fontSize: 12, margin: "4px 0 0" }}>
          since you started logging
        </p>
      </Card>
    </div>
  );
}
