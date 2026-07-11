import Link from "next/link";
import { signup } from "@/app/login/actions";
import { Logo } from "@/app/components/ui";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 50% 0%, rgba(91,33,182,0.2), var(--bg) 60%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div style={{ width: "100%", maxWidth: 380 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 32,
          }}
        >
          <Logo size={56} />
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 26,
              fontWeight: 700,
              margin: "16px 0 4px",
            }}
          >
            Teenfit Tracker
          </h1>
          <p style={{ color: "var(--text-dim)", fontSize: 14, margin: 0 }}>
            Train smart. Track everything. Stay private.
          </p>
        </div>

        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 16,
            padding: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 4,
              marginBottom: 20,
              background: "var(--bg)",
              borderRadius: 10,
              padding: 4,
            }}
          >
            <Link
              href="/login"
              style={{
                flex: 1,
                textAlign: "center",
                padding: "8px 0",
                borderRadius: 8,
                color: "var(--text-dim)",
                fontWeight: 600,
                fontSize: 13,
              }}
            >
              Log in
            </Link>
            <span
              style={{
                flex: 1,
                textAlign: "center",
                padding: "8px 0",
                borderRadius: 8,
                background: "var(--accent)",
                color: "#fff",
                fontWeight: 600,
                fontSize: 13,
              }}
            >
              Sign up
            </span>
          </div>

          <form>
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Your name</label>
              <input
                name="name"
                type="text"
                required
                placeholder="Jordan"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Email</label>
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Password</label>
              <input
                name="password"
                type="password"
                required
                minLength={6}
                placeholder="At least 6 characters"
                style={inputStyle}
              />
            </div>

            {params.error && (
              <p style={{ color: "#f0a0a0", fontSize: 12.5, margin: "0 0 14px" }}>
                {params.error}
              </p>
            )}

            <button formAction={signup} style={buttonStyle}>
              Create my account
            </button>
          </form>

          <p
            style={{
              color: "var(--text-faint)",
              fontSize: 11.5,
              textAlign: "center",
              marginTop: 14,
              lineHeight: 1.5,
            }}
          >
            Your data is private to your account only. Nobody else can see
            your workouts, weight, or progress.
          </p>
        </div>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  color: "var(--text-dim)",
  marginBottom: 6,
  fontWeight: 500,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--bg)",
  border: "1px solid var(--border)",
  borderRadius: 10,
  padding: "10px 12px",
  color: "var(--text)",
  fontSize: 14,
  outline: "none",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 0",
  borderRadius: 10,
  border: "none",
  background: "linear-gradient(135deg, var(--accent), var(--accent-deep))",
  color: "#fff",
  fontWeight: 700,
  fontSize: 14,
  cursor: "pointer",
};
