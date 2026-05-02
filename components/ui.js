// ─── Eyebrow / labels ─────────────────────────────────────

export function Eyebrow({ children, color = "rgba(255,255,255,0.5)" }) {
  return (
    <div
      style={{
        fontFamily: "Inter",
        fontWeight: 600,
        fontSize: 11,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color,
      }}
    >
      {children}
    </div>
  );
}

export function MonoLabel({ children, color = "rgba(255,255,255,0.5)" }) {
  return (
    <div
      style={{
        fontFamily: "JetBrains Mono, monospace",
        fontWeight: 500,
        fontSize: 11,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color,
      }}
    >
      {children}
    </div>
  );
}

// ─── Button ───────────────────────────────────────────────

export function Btn({
  children,
  variant = "primary",
  onClick,
  full,
  style = {},
}) {
  const base = {
    fontFamily: "Inter, sans-serif",
    fontWeight: 600,
    fontSize: 14,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    padding: "14px 20px",
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    width: full ? "100%" : "auto",
    transition: "transform 100ms cubic-bezier(0.2,0.8,0.2,1)",
  };
  const variants = {
    primary: { background: "#0066FF", color: "#fff" },
    secondary: {
      background: "rgba(255,255,255,0.08)",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.16)",
    },
    ghost: { background: "transparent", color: "#fff" },
  };
  return (
    <button
      onClick={onClick}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
      style={{ ...base, ...variants[variant], ...style }}
    >
      {children}
    </button>
  );
}

// ─── Stat Card ────────────────────────────────────────────

export function StatCard({ label, value, unit, delta, deltaDir = "up" }) {
  const deltaColor =
    deltaDir === "up"
      ? "#00C46A"
      : deltaDir === "down"
      ? "#FF3B30"
      : "rgba(255,255,255,0.5)";
  const arrow = deltaDir === "up" ? "▲" : deltaDir === "down" ? "▼" : "·";
  return (
    <div
      style={{
        background: "#101216",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 16,
        padding: 16,
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 32px rgba(0,0,0,0.6)",
      }}
    >
      <MonoLabel>{label}</MonoLabel>
      <div
        style={{
          fontFamily: "Barlow Condensed, sans-serif",
          fontWeight: 800,
          fontSize: 44,
          lineHeight: 0.95,
          letterSpacing: "-0.02em",
          fontVariantNumeric: "tabular-nums",
          color: "#fff",
          marginTop: 6,
        }}
      >
        {value}
        {unit && (
          <span style={{ fontSize: 18, opacity: 0.5 }}>{unit}</span>
        )}
      </div>
      {delta && (
        <div
          style={{
            fontFamily: "JetBrains Mono",
            fontSize: 11,
            fontWeight: 600,
            color: deltaColor,
            marginTop: 6,
          }}
        >
          {arrow} {delta}
        </div>
      )}
    </div>
  );
}

// ─── Drill Card ───────────────────────────────────────────

export function DrillCard({ name, category, duration, status, onClick }) {
  const done = status === "done";
  const active = status === "active";
  return (
    <div
      onClick={onClick}
      style={{
        background: "#101216",
        border: active
          ? "2px solid rgba(0,102,255,0.6)"
          : "1px solid rgba(255,255,255,0.06)",
        borderRadius: 16,
        padding: active ? 17 : 18,
        display: "grid",
        gridTemplateColumns: "52px 1fr auto",
        gap: 14,
        alignItems: "center",
        cursor: "pointer",
        opacity: done ? 0.55 : 1,
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 12,
          background: done
            ? "rgba(0,196,106,0.14)"
            : "rgba(0,102,255,0.12)",
          color: done ? "#00C46A" : "#0066FF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {done ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 13l5 5L19 7" />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M9 9 L 15 15 M 15 9 L 9 15" />
          </svg>
        )}
      </div>
      <div>
        <div
          style={{
            fontFamily: "Barlow Condensed",
            fontWeight: 700,
            fontSize: 20,
            lineHeight: 1.1,
            color: "#fff",
            textDecoration: done ? "line-through" : "none",
            textDecorationColor: "rgba(255,255,255,0.3)",
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontFamily: "JetBrains Mono",
            fontSize: 10,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginTop: 3,
          }}
        >
          {category} · {duration}
        </div>
      </div>
      <div
        style={{
          fontFamily: "JetBrains Mono",
          fontWeight: 600,
          fontSize: 12,
          color: done ? "#00C46A" : "#0066FF",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        {done ? "DONE" : duration.replace(" min", "m")}
      </div>
    </div>
  );
}

// ─── Coach Voice Card ─────────────────────────────────────

export function CoachVoiceCard({ message, length = "0:32" }) {
  return (
    <div
      style={{
        background: "#101216",
        border: "1px solid rgba(0,102,255,0.3)",
        borderRadius: 16,
        padding: 18,
        display: "grid",
        gridTemplateColumns: "52px 1fr",
        gap: 14,
        alignItems: "center",
        boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 999,
          background:
            "radial-gradient(circle at 35% 30%, #1F7AFF, #0066FF 60%, #0052CC)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "nlfPulse 2.4s cubic-bezier(0.2,0.8,0.2,1) infinite",
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <path d="M4 10v4M8 6v12M12 9v6M16 5v14M20 10v4" />
        </svg>
      </div>
      <div>
        <Eyebrow color="#0066FF">AI Coach</Eyebrow>
        <div
          style={{
            fontFamily: "Inter",
            fontWeight: 500,
            fontStyle: "italic",
            fontSize: 15,
            lineHeight: 1.4,
            color: "#fff",
            marginTop: 4,
          }}
        >
          &ldquo;{message}&rdquo;
        </div>
        <div
          style={{
            fontFamily: "JetBrains Mono",
            fontSize: 10,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginTop: 6,
          }}
        >
          {length} · Tap to listen
        </div>
      </div>
    </div>
  );
}

// ─── Skill Bar ────────────────────────────────────────────

export function SkillBar({ label, value, color = "#0066FF" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span
        style={{
          fontFamily: "JetBrains Mono",
          fontSize: 11,
          color: "rgba(255,255,255,0.6)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          width: 110,
        }}
      >
        {label}
      </span>
      <div
        style={{
          flex: 1,
          height: 6,
          borderRadius: 999,
          background: "rgba(255,255,255,0.08)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${value * 10}%`,
            height: "100%",
            background: color,
            borderRadius: 999,
          }}
        />
      </div>
      <span
        style={{
          fontFamily: "JetBrains Mono",
          fontSize: 12,
          fontWeight: 600,
          color: "#fff",
          width: 40,
          textAlign: "right",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </span>
    </div>
  );
}
