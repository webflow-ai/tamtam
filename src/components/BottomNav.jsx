import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  {
    path: "/home",
    label: "Home",
    icon: (active) => (
      <svg
        className={`w-5 h-5 transition-transform duration-300 ${active ? "text-primary scale-110" : "text-gray-400"}`}
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
        className={`w-5 h-5 transition-transform duration-300 ${active ? "text-primary scale-110" : "text-gray-400"}`}
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
        className={`w-5 h-5 transition-transform duration-300 ${active ? "text-primary scale-110" : "text-gray-400"}`}
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={active ? "0" : "1.8"}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 18l6-6-6-6" />
        {active && <rect x="2" y="3" width="20" height="18" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />}
        {!active && <rect x="2" y="3" width="20" height="18" rx="3" />}
        <line x1="7" y1="8" x2="17" y2="8" strokeWidth="1.8" stroke={active ? "#1B4332" : "currentColor"} />
        <line x1="7" y1="12" x2="14" y2="12" strokeWidth="1.8" stroke={active ? "#1B4332" : "currentColor"} />
        <line x1="7" y1="16" x2="11" y2="16" strokeWidth="1.8" stroke={active ? "#1B4332" : "currentColor"} />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="bottom-nav">
      <div className="flex items-center justify-around py-2.5 px-6">
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
              className="btn-press flex flex-col items-center gap-1.5 px-6 py-1.5 rounded-2xl relative cursor-pointer"
            >
              {/* Highlight pill behind active icon */}
              {isActive && (
                <span className="absolute inset-0 bg-primary/6 rounded-xl scale-95 transition-all duration-300" />
              )}
              <div className="relative z-10">{item.icon(isActive)}</div>
              <span
                className={`text-[10px] font-bold tracking-wide transition-colors relative z-10 ${
                  isActive ? "text-primary" : "text-gray-400"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
