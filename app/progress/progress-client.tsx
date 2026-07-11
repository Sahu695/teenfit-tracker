"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Dot,
} from "recharts";
import { Card } from "@/app/components/ui";
import { addWeightEntry, toggleUnits } from "./actions";

type WeightRow = { id: string; weight: number; logged_at: string };

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function CustomDot(props: { cx?: number; cy?: number }) {
  const { cx, cy } = props;
  return <Dot cx={cx} cy={cy} r={4} fill="#b794f6" stroke="#16151c" strokeWidth={2} />;
}

export function ProgressClient({
  initialUnits,
  initialLog,
}: {
  initialUnits: "lb" | "kg";
  initialLog: WeightRow[];
}) {
  const [units, setUnits] = useState(initialUnits);
  const [log, setLog] = useState(initialLog);
  const [weightInput, setWeightInput] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);

  const chartData = log.map((entry) => ({ ...entry, label: formatDate(entry.logged_at) }));
  const first = log[0]?.weight;
  const last = log[log.length - 1]?.weight;
  const diff = first !== undefined && last !== undefined ? last - first : 0;

  async function handleAdd() {
    const val = parseFloat(weightInput);
    if (!val || val <= 0) return;
    setSaving(true);
    const result = await addWeightEntry(val);
    setSaving(false);
    if (!result.error) {
      setLog((prev) => [
        ...prev,
        { id: crypto.randomUUID(), weight: val, logged_at: new Date().toISOString().slice(0, 10) },
      ]);
      setWeightInput("");
      setShowAdd(false);
    }
  }

  async function handleToggleUnits() {
    const result = await toggleUnits(units);
    if (result.units) setUnits(result.units as "lb" | "kg");
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 700, margin: 0 }}>
          Progress
        </h1>
        <button
          onClick={handleToggleUnits}
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 999,
            padding: "6px 12px",
            color: "var(--text-dim)",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {units.toUpperCase()}
        </button>
      </div>
      <p style={{ color: "var(--text-dim)", fontSize: 14, margin: "0 0 18px" }}>
        Track your weight weekly — trends matter far more than any single day.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        <Card style={{ padding: 16 }}>
          <p style={{ color: "var(--text-dim)", fontSize: 11.5, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: 0.5 }}>
            Current
          </p>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 700, margin: 0 }}>
            {last !== undefined ? `${last} ${units}` : "—"}
          </p>
        </Card>
        <Card style={{ padding: 16 }}>
          <p style={{ color: "var(--text-dim)", fontSize: 11.5, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: 0.5 }}>
            Since start
          </p>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: diff === 0 ? "var(--text)" : "var(--accent-bright)",
              fontSize: 24,
              fontWeight: 700,
              margin: 0,
            }}
          >
            {diff > 0 ? "+" : ""}
            {diff.toFixed(1)} {units}
          </p>
        </Card>
      </div>

      <Card style={{ marginBottom: 16 }}>
        <p
          style={{
            color: "var(--text-dim)",
            fontSize: 12.5,
            fontWeight: 600,
            margin: "0 0 12px",
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          Weight over time
        </p>
        <div style={{ width: "100%", height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 8, left: -18, bottom: 0 }}>
              <CartesianGrid stroke="#332f45" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="label"
                stroke="#6b677a"
                tick={{ fontSize: 11, fill: "#6b677a" }}
                axisLine={{ stroke: "#332f45" }}
                tickLine={false}
              />
              <YAxis
                stroke="#6b677a"
                tick={{ fontSize: 11, fill: "#6b677a" }}
                axisLine={false}
                tickLine={false}
                width={36}
                domain={["auto", "auto"]}
              />
              <Tooltip
                contentStyle={{ background: "#262533", border: "1px solid #332f45", borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: "#9d99ac" }}
                itemStyle={{ color: "#f0eef6" }}
                formatter={(val: unknown) => [`${val} ${units}`, "Weight"]}              />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#b794f6"
                strokeWidth={2.5}
                dot={<CustomDot />}
                activeDot={{ r: 6, fill: "#8b5cf6" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {showAdd ? (
        <Card style={{ marginBottom: 16 }}>
          <p style={{ color: "var(--text-dim)", fontSize: 12.5, fontWeight: 600, margin: "0 0 10px" }}>
            Log this week&apos;s weight
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <input
              type="number"
              value={weightInput}
              onChange={(e) => setWeightInput(e.target.value)}
              placeholder={`Weight in ${units}`}
              style={{
                flex: 1,
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: "10px 12px",
                color: "var(--text)",
                fontSize: 14,
                outline: "none",
              }}
            />
            <button
              onClick={handleAdd}
              disabled={saving}
              style={{
                padding: "10px 18px",
                borderRadius: 10,
                border: "none",
                background: "var(--accent)",
                color: "#fff",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </Card>
      ) : (
        <button
          onClick={() => setShowAdd(true)}
          style={{
            width: "100%",
            padding: "13px 0",
            borderRadius: 10,
            border: "1px dashed var(--accent)",
            background: "rgba(139,92,246,0.08)",
            color: "var(--accent-bright)",
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            marginBottom: 16,
          }}
        >
          <Plus size={16} /> Log this week&apos;s weight
        </button>
      )}

      <Card>
        <p
          style={{
            color: "var(--text-dim)",
            fontSize: 12.5,
            fontWeight: 600,
            margin: "0 0 10px",
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          History
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {log.length === 0 && (
            <p style={{ color: "var(--text-faint)", fontSize: 13 }}>No entries yet — log your first weight above.</p>
          )}
          {[...log].reverse().map((entry, i) => (
            <div
              key={entry.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "6px 0",
                borderBottom: i < log.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <span style={{ color: "var(--text-dim)", fontSize: 13 }}>{formatDate(entry.logged_at)}</span>
              <span style={{ fontSize: 13, fontWeight: 600 }}>
                {entry.weight} {units}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
