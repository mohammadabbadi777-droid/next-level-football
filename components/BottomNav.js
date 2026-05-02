import { useRouter } from "next/router";

const items = [
  {
    id: "today",
    label: "Today",
    href: "/dashboard",
    icon: <path d="M3 12L12 4l9 8M5 10v10h14V10" />,
  },
  {
    id: "plan",
    label: "Plan",
    href: "/training",
    icon: (
      <g>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M3 10h18M8 2v4M16 2v4" />
      </g>
    ),
  },
  {
    id: "matchiq",
    label: "Match IQ",
    href: "/match-iq",
    icon: (
      <g>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4l2 2" />
      </g>
    ),
  },
  {
    id: "progress",
    label: "Progress",
    href: "/progress",
    icon: (
      <g>
        <path d="M3 16l5-5 4 3 9-9" />
        <path d="M16 5h5v5" />
      </g>
    ),
  },
  {
    id: "you",
    label: "You",
    href: "/comparison",
    icon: (
      <g>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-5 4-7 8-7s8 2 8 7" />
      </g>
    ),
  },
];

export default function BottomNav() {
  const router = useRouter();

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "rgba(10,11,13,0.92)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "12px 8px 28px",
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        zIndex: 30,
      }}
    >
      {items.map((it) => {
        const active = router.pathname === it.href;
        return (
          <button
            key={it.id}
            onClick={() => router.push(it.href)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 6,
              color: active ? "#0066FF" : "rgba(255,255,255,0.5)",
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {it.icon}
            </svg>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: 9.5,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {it.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
