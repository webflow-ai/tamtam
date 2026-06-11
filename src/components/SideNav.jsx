import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  {
    path: "/home",
    label: "Home",
    icon: (active) => (
      <svg
        className={`w-5 h-5 transition-all duration-200`}
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
    label: "Plan Commute",
    icon: (active) => (
      <svg
        className="w-5 h-5"
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
    label: "All Routes",
    icon: (active) => (
      <svg
        className="w-5 h-5"
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

export default function SideNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-brand-logo">
          <div className="sidebar-brand-icon">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
            </svg>
          </div>
          <h1>TamTam</h1>
        </div>
        <div className="sidebar-live-badge">
          <span className="dot" />
          <span className="label">Live Status · Gwalior</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <p style={{ fontSize: "0.62rem", fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", padding: "4px 14px 8px" }}>
          Navigation
        </p>
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path === "/home" && location.pathname === "/") ||
            (item.path === "/search" && location.pathname === "/route");

          return (
            <button
              key={item.path}
              id={`nav-${item.label.toLowerCase().replace(/\s/g, "-")}`}
              onClick={() => navigate(item.path)}
              className={`sidebar-nav-item ${isActive ? "active" : ""}`}
            >
              {item.icon(isActive)}
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer info */}
      <div className="sidebar-footer">
        <div className="sidebar-service-info">
          <p className="title">Service Hours</p>
          <p className="hours">6:00 AM — 9:00 PM</p>
          <p className="sub">Peak: every 10–15 min</p>
        </div>
      </div>
    </aside>
  );
}
