import { useNavigate } from "react-router-dom";

export default function TopBar({ title, showBack = true, rightIcon = null, transparent = false }) {
  const navigate = useNavigate();

  return (
    <div
      className={`sticky top-0 z-40 flex items-center justify-between px-4 pt-[calc(0.875rem+env(safe-area-inset-top))] pb-3.5 transition-all duration-300 ${
        transparent
          ? "bg-transparent text-primary"
          : "bg-white/80 backdrop-blur-md border-b border-primary/5 text-primary shadow-xs"
      }`}
    >
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            id="topbar-back-btn"
            onClick={() => navigate(-1)}
            className="btn-press flex items-center justify-center w-9 h-9 rounded-full bg-primary/5 hover:bg-primary/10 transition-colors duration-200 cursor-pointer text-primary"
            aria-label="Go back"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <h1 className="text-base font-bold tracking-tight text-primary-dark">{title}</h1>
      </div>
      {rightIcon && <div className="flex items-center">{rightIcon}</div>}
    </div>
  );
}
