"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, Loader2 } from "lucide-react";
import { Card } from "./ui";

const COACH_STARTERS = [
  "Why am I not seeing progress?",
  "What should I eat before training?",
  "I'm not feeling motivated today",
  "How do I know if I'm doing too much?",
];

type Message = { role: "user" | "assistant"; content: string };

export function AiCoach() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function sendMessage(text: string) {
    const content = text.trim();
    if (!content || loading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!response.ok) throw new Error("Request failed");
      const data = await response.json();

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setError("Coach is offline right now. Try again in a bit.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 18px 12px" }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 9,
            background: "linear-gradient(135deg, var(--accent), var(--accent-deep))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <MessageCircle size={16} color="#fff" />
        </div>
        <div>
          <p style={{ fontSize: 14.5, fontWeight: 700, margin: 0 }}>AI coach</p>
          <p style={{ color: "var(--text-faint)", fontSize: 11.5, margin: 0 }}>
            Ask about training or food
          </p>
        </div>
      </div>

      <div
        ref={scrollRef}
        style={{
          maxHeight: messages.length ? 260 : 0,
          overflowY: "auto",
          transition: "max-height 0.2s",
          padding: "0 18px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "85%",
              background: m.role === "user" ? "var(--accent)" : "var(--surface-raised)",
              color: m.role === "user" ? "#fff" : "var(--text)",
              borderRadius: 12,
              padding: "9px 13px",
              fontSize: 13.5,
              lineHeight: 1.5,
            }}
          >
            {m.content}
          </div>
        ))}
        {loading && (
          <div
            style={{
              alignSelf: "flex-start",
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: "var(--text-faint)",
              fontSize: 12.5,
              padding: "6px 0",
            }}
          >
            <Loader2 size={13} className="spin" /> Coach is typing…
          </div>
        )}
        {messages.length > 0 && <div style={{ height: 4 }} />}
      </div>

      {error && <p style={{ color: "#f0a0a0", fontSize: 12, margin: "8px 18px 0" }}>{error}</p>}

      {messages.length === 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, padding: "0 18px 12px" }}>
          {COACH_STARTERS.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              style={{
                fontSize: 12,
                color: "var(--accent-bright)",
                background: "rgba(139,92,246,0.12)",
                border: "1px solid var(--accent-deep)",
                borderRadius: 999,
                padding: "6px 11px",
                cursor: "pointer",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div
        style={{
          display: "flex",
          gap: 8,
          padding: "12px 14px",
          borderTop: "1px solid var(--border)",
          background: "var(--surface)",
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage(input);
          }}
          placeholder="Ask your coach something..."
          style={{
            flex: 1,
            background: "var(--bg)",
            border: "1px solid var(--border)",
            borderRadius: 10,
            padding: "9px 12px",
            color: "var(--text)",
            fontSize: 13.5,
            outline: "none",
          }}
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={loading || !input.trim()}
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            border: "none",
            background: input.trim() && !loading ? "var(--accent)" : "var(--surface-raised)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: input.trim() && !loading ? "pointer" : "default",
            flexShrink: 0,
          }}
        >
          <Send size={15} />
        </button>
      </div>
      <style>{`
        .spin { animation: coachspin 0.8s linear infinite; }
        @keyframes coachspin { to { transform: rotate(360deg); } }
      `}</style>
    </Card>
  );
}
