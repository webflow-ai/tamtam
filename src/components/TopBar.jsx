import { useNavigate } from "react-router-dom";

export default function TopBar({ title, showBack = true, rightIcon = null }) {
  const navigate = useNavigate();

  return (
    <div className="desktop-topbar">
      <div className="desktop-topbar-title">
        {showBack && (
          <button
            id="topbar-back-btn"
            onClick={() => navigate(-1)}
            className="topbar-back-btn"
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
        <h2>{title}</h2>
      </div>
      {rightIcon && <div className="flex items-center">{rightIcon}</div>}
    </div>
  );
}
