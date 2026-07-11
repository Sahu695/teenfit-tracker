"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft, Building2, Home, Check } from "lucide-react";
import { Card, Pill } from "@/app/components/ui";
import { GYM_PLANS, HOME_PLANS, type WorkoutPlan } from "@/app/data/plans";
import { selectPlan } from "./actions";

export function WorkoutsClient({
  selectedPlanId,
  selectedPlanLocation,
}: {
  selectedPlanId: string | null;
  selectedPlanLocation: "gym" | "home" | null;
}) {
  const [location, setLocation] = useState<"gym" | "home">("gym");
  const [openPlanId, setOpenPlanId] = useState<string | null>(null);
  const [currentSelection, setCurrentSelection] = useState({
    id: selectedPlanId,
    location: selectedPlanLocation,
  });
  const [saving, setSaving] = useState(false);

  const plans = location === "gym" ? GYM_PLANS : HOME_PLANS;
  const planList = Object.values(plans);

  async function handleSelect(plan: WorkoutPlan) {
    setSaving(true);
    const result = await selectPlan(plan.id, plan.location);
    setSaving(false);
    if (!result.error) {
      setCurrentSelection({ id: plan.id, location: plan.location });
    }
  }

  if (openPlanId) {
    const plan = plans[openPlanId];
    const isSelected = currentSelection.id === plan.id && currentSelection.location === plan.location;

    return (
      <div>
        <button onClick={() => setOpenPlanId(null)} style={backButtonStyle}>
          <ChevronLeft size={16} /> Back to plans
        </button>

        <div style={{ marginTop: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            {plan.location === "home" ? (
              <Home size={16} color="var(--accent-bright)" />
            ) : (
              <Building2 size={16} color="var(--accent-bright)" />
            )}
            <span
              style={{
                color: "var(--accent-bright)",
                fontSize: 12,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              {plan.location === "home" ? "Home version" : "Gym version"}
            </span>
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, margin: 0 }}>
            {plan.label}
          </h2>
        </div>

        {plan.equipmentNote && (
          <p style={{ color: "var(--text-faint)", fontSize: 12.5, marginTop: 8, lineHeight: 1.5 }}>
            {plan.equipmentNote}
          </p>
        )}

        <button
          onClick={() => handleSelect(plan)}
          disabled={saving}
          style={{
            marginTop: 16,
            width: "100%",
            padding: "12px 0",
            borderRadius: 10,
            border: isSelected ? "1px solid var(--accent)" : "none",
            background: isSelected
              ? "rgba(139,92,246,0.15)"
              : "linear-gradient(135deg, var(--accent), var(--accent-deep))",
            color: isSelected ? "var(--accent-bright)" : "#fff",
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          {isSelected ? (
            <>
              <Check size={16} /> This is your active plan
            </>
          ) : saving ? (
            "Saving..."
          ) : (
            "Set as my active plan"
          )}
        </button>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 20 }}>
          {plan.days.map((day, i) => (
            <Card key={i}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: 12,
                }}
              >
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>{day.day}</h3>
                <span style={{ color: "var(--accent-bright)", fontSize: 12.5, fontWeight: 500 }}>
                  {day.focus}
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {day.exercises.map((e, j) => (
                  <div
                    key={j}
                    style={{
                      borderTop: j > 0 ? "1px solid var(--border)" : "none",
                      paddingTop: j > 0 ? 10 : 0,
                    }}
                  >
                    <p style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>{e.name}</p>
                    <p style={{ color: "var(--text-dim)", fontSize: 12.5, margin: "2px 0 0" }}>
                      {e.sets}
                    </p>
                    {e.alt && (
                      <p
                        style={{
                          color: "var(--text-faint)",
                          fontSize: 12,
                          margin: "2px 0 0",
                          fontStyle: "italic",
                        }}
                      >
                        {e.alt}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <p style={{ color: "var(--text-faint)", fontSize: 12.5, marginTop: 14, textAlign: "center" }}>
          {plan.restNote}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 700, margin: "0 0 4px" }}>
        Workouts
      </h1>
      <p style={{ color: "var(--text-dim)", fontSize: 14, margin: "0 0 18px" }}>
        Every plan is built around training each move to failure — quality over quantity.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
        <Pill active={location === "gym"} onClick={() => setLocation("gym")}>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Building2 size={14} /> Gym
          </span>
        </Pill>
        <Pill active={location === "home"} onClick={() => setLocation("home")}>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Home size={14} /> Home
          </span>
        </Pill>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {planList.map((plan) => {
          const isSelected = currentSelection.id === plan.id && currentSelection.location === plan.location;
          return (
            <Card
              key={plan.id}
              onClick={() => setOpenPlanId(plan.id)}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
            >
              <div>
                <p style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>{plan.label}</p>
                <p style={{ color: "var(--text-faint)", fontSize: 12.5, margin: "4px 0 0" }}>
                  {plan.days.length} training day{plan.days.length > 1 ? "s" : ""} per week
                </p>
                {isSelected && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      marginTop: 8,
                      fontSize: 11.5,
                      color: "var(--accent-bright)",
                      background: "rgba(139,92,246,0.15)",
                      padding: "3px 8px",
                      borderRadius: 999,
                      fontWeight: 600,
                    }}
                  >
                    <Check size={11} /> Active plan
                  </span>
                )}
              </div>
              <ChevronRight size={20} color="var(--text-faint)" />
            </Card>
          );
        })}
      </div>
    </div>
  );
}

const backButtonStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 4,
  background: "none",
  border: "none",
  color: "var(--accent-bright)",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  padding: 0,
};
