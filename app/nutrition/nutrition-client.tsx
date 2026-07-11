"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Card } from "@/app/components/ui";
import { NUTRITION_SECTIONS } from "@/app/data/nutrition";

export function NutritionClient() {
  const [openId, setOpenId] = useState<string | null>("basics");

  return (
    <div>
      <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 700, margin: "0 0 4px" }}>
        Nutrition
      </h1>
      <p style={{ color: "var(--text-dim)", fontSize: 14, margin: "0 0 18px", lineHeight: 1.5 }}>
        Food fuels training. These are general, educational guidelines — not a strict diet plan.
        Growing bodies have different needs, so check in with a parent, doctor, or dietitian for
        anything personal.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {NUTRITION_SECTIONS.map((section) => {
          const open = openId === section.id;
          return (
            <Card key={section.id} style={{ padding: 0, overflow: "hidden" }}>
              <button
                onClick={() => setOpenId(open ? null : section.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "none",
                  border: "none",
                  padding: "16px 20px",
                  cursor: "pointer",
                  color: "var(--text)",
                }}
              >
                <span style={{ fontSize: 14.5, fontWeight: 600, textAlign: "left" }}>
                  {section.title}
                </span>
                <ChevronRight
                  size={16}
                  color="var(--text-faint)"
                  style={{ transform: open ? "rotate(90deg)" : "none", transition: "transform 0.15s" }}
                />
              </button>
              {open && (
                <div style={{ padding: "0 20px 18px" }}>
                  <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 10 }}>
                    {section.tips.map((tip, i) => (
                      <li key={i} style={{ color: "var(--text-dim)", fontSize: 13.5, lineHeight: 1.6 }}>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <Card
        style={{
          marginTop: 16,
          background: "rgba(139,92,246,0.08)",
          border: "1px solid var(--accent-deep)",
        }}
      >
        <p style={{ color: "var(--accent-bright)", fontSize: 13, fontWeight: 600, margin: "0 0 4px" }}>
          A note on these numbers
        </p>
        <p style={{ color: "var(--text-dim)", fontSize: 13, margin: 0, lineHeight: 1.6 }}>
          The calorie and protein ranges above are general educational examples, not personalized
          medical advice. They&apos;re meant to start a conversation with a parent, coach, or doctor —
          not replace one.
        </p>
      </Card>
    </div>
  );
}
