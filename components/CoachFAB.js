export default function CoachFAB({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "fixed",
        bottom: 110,
        right: 16,
        zIndex: 25,
        width: 56,
        height: 56,
        borderRadius: 999,
        background:
          "radial-gradient(circle at 35% 30%, #1F7AFF, #0066FF 60%, #0052CC)",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow:
          "0 8px 24px rgba(0,102,255,0.4), 0 2px 4px rgba(0,0,0,0.4)",
        animation: "nlfPulse 2.4s cubic-bezier(0.2,0.8,0.2,1) infinite",
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <path d="M4 10v4M8 6v12M12 9v6M16 5v14M20 10v4" />
      </svg>
      <style>{`
        @keyframes nlfPulse {
          0%,100% { box-shadow: 0 8px 24px rgba(0,102,255,0.4), 0 0 0 0 rgba(0,102,255,0.5); }
          50% { box-shadow: 0 8px 24px rgba(0,102,255,0.4), 0 0 0 12px rgba(0,102,255,0); }
        }
      `}</style>
    </button>
  );
}
