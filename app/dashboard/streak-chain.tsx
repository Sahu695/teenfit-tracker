"use client";

import { Flame } from "lucide-react";
import { Card } from "@/app/components/ui";

export function DashboardStreak({ streak }: { streak: number }) {
  const total = 7;

  return (
    <Card style={{ background: "linear-gradient(135deg, var(--surface-raised), var(--surface))" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 14,
        }}
      >
        <div>
          <p
            style={{
              color: "var(--text-dim)",
              fontSize: 12,
              margin: 0,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            Current streak
          </p>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 36,
              fontWeight: 700,
              margin: "2px 0 0",
              lineHeight: 1,
            }}
          >
            {streak} <span style={{ fontSize: 16, color: "var(--text-dim)", fontWeight: 500 }}>days</span>
          </p>
        </div>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: "rgba(139,92,246,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Flame size={22} color="var(--accent-bright)" />
        </div>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {Array.from({ length: total }).map((_, i) => {
          const lit = i < streak % total || (streak >= total && i < total);
          return (
            <div
              key={i}
              style={{
                flex: 1,
                height: 36,
                borderRadius: 8,
                background: lit
                  ? "linear-gradient(180deg, var(--accent-bright), var(--accent))"
                  : "var(--bg)",
                border: `1px solid ${lit ? "var(--accent)" : "var(--border)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {lit && <Flame size={16} color="#fff" strokeWidth={2.2} />}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
