import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  {
    path: "/home",
    label: "Home",
    icon: (active) => (
      <svg
        style={{ width: 22, height: 22, transition: "transform 0.2s ease" }}
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={active ? "0" : "1.8"}
      >
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V9.5z" />
      </svg>
    ),
  },
  {
    path: "/search",
    label: "Plan",
    icon: (active) => (
      <svg
        style={{ width: 22, height: 22 }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={active ? "2.5" : "1.8"}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    path: "/routes",
    label: "Routes",
    icon: (active) => (
      <svg
        style={{ width: 22, height: 22 }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="20" height="18" rx="3" />
        <line x1="7" y1="8" x2="17" y2="8" />
        <line x1="7" y1="12" x2="14" y2="12" />
        <line x1="7" y1="16" x2="11" y2="16" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="bottom-nav">
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "8px 16px 4px",
        height: 56,
      }}>
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path === "/home" && location.pathname === "/") ||
            (item.path === "/search" && location.pathname === "/route");

          return (
            <button
              key={item.path}
              id={`nav-${item.label.toLowerCase()}`}
              onClick={() => navigate(item.path)}
              className="btn-press"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                padding: "6px 20px",
                borderRadius: "14px",
                border: "none",
                background: isActive ? "rgba(27,67,50,0.06)" : "transparent",
                cursor: "pointer",
                color: isActive ? "#1B4332" : "#9ca3af",
                fontFamily: "var(--font-family-poppins)",
                position: "relative",
                transition: "all 0.2s ease",
              }}
            >
              {item.icon(isActive)}
              <span style={{
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: "0.04em",
                color: isActive ? "#1B4332" : "#9ca3af",
                transition: "color 0.2s ease",
              }}>
                {item.label}
              </span>
              {isActive && (
                <span style={{
                  position: "absolute",
                  top: -1,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 20,
                  height: 2.5,
                  borderRadius: "0 0 4px 4px",
                  background: "#1B4332",
                }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
