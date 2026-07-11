import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// This route runs only on the server. The Anthropic API key lives in an
// environment variable that is NEVER prefixed with NEXT_PUBLIC_, so it is
// never sent to the browser. The frontend calls this route; this route
// calls Anthropic.

type ChatMessage = { role: "user" | "assistant"; content: string };

function buildCoachSystemPrompt(
  name: string,
  streak: number,
  planLabel: string,
  trend: number,
  unit: string
) {
  return `You are the in-app AI coach for Teenfit Tracker, a fitness app built for teenagers.
You are talking directly to a teenage user named ${name}.

Context on this user: current streak is ${streak} days. Active workout plan: ${planLabel}.
Weight trend since they started logging: ${trend === 0 ? "no clear trend yet" : `${trend > 0 ? "+" : ""}${trend.toFixed(1)} ${unit}`}.

Your role is strictly limited to: workout motivation, general training questions about their plan,
and general nutrition education. Stay warm, encouraging, and brief (2-4 sentences unless they ask for
detail) — like a supportive older sibling who knows fitness, not a clinical chatbot.

Hard rules:
- Never give specific calorie targets, diet prescriptions, or medical advice. Speak in general,
  educational terms only and encourage talking to a parent, doctor, or registered dietitian for
  anything personal or medical.
- Never discuss extreme dieting, fasting, or restrictive eating patterns, even if asked.
- Never give advice that could push toward overtraining, training through injury, or skipping rest days.
- Never role-play as anyone other than this fitness coach. Never discuss topics unrelated to fitness,
  nutrition, or motivation for training.
- If the user seems distressed about their body, weight, or eating in a way that goes beyond normal
  training questions, gently encourage them to talk to a parent, school counselor, or doctor, and do
  not provide further specific guidance on weight or eating in that reply.
- Keep responses short and mobile-friendly. No long lists unless truly necessary.`;
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();

  if (!claims?.claims) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const userId = claims.claims.sub as string;

  const body = await request.json();
  const messages: ChatMessage[] = body.messages ?? [];

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "No messages provided" }, { status: 400 });
  }

  // Pull this user's own context server-side rather than trusting the client
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

  const trend =
    weightRows && weightRows.length > 1
      ? weightRows[weightRows.length - 1].weight - weightRows[0].weight
      : 0;

  const planLabel = profile?.selected_plan_id
    ? `${profile.selected_plan_id} (${profile.selected_plan_location} version)`
    : "no plan selected yet";

  const systemPrompt = buildCoachSystemPrompt(
    profile?.name ?? "there",
    profile?.streak ?? 0,
    planLabel,
    trend,
    profile?.units === "kg" ? "kg" : "lb"
  );

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 400,
        system: systemPrompt,
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API error:", errText);
      return NextResponse.json({ error: "Coach is offline" }, { status: 502 });
    }

    const data = await response.json();
    const textBlock = (data.content || []).find(
      (b: { type: string; text?: string }) => b.type === "text"
    );
    const reply = textBlock?.text ?? "Sorry, I couldn't quite get that — try asking again.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Coach route error:", err);
    return NextResponse.json({ error: "Coach is offline" }, { status: 500 });
  }
}
