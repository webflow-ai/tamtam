import { useState } from "react";
import FareBadge from "./FareBadge";

export default function RouteCard({ route, index = 0 }) {
  const [expanded, setExpanded] = useState(false);

  const firstStop = route.stops[0];
  const lastStop = route.stops[route.stops.length - 1];
  const color = route.color || "#1B4332";

  return (
    <div
      className="fade-in-up glass-card-solid"
      style={{
        animationDelay: `${index * 0.08}s`,
        overflow: "hidden",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* Header Row */}
      <button
        id={`route-card-${route.id}`}
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        style={{
          width: "100%",
          textAlign: "left",
          padding: "16px",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font-family-poppins)",
          display: "block",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Left: badge + name */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 14,
                background: `linear-gradient(135deg, ${color}, ${color}bb)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 800,
                fontSize: "0.82rem",
                flexShrink: 0,
                boxShadow: `0 4px 12px ${color}40`,
              }}
            >
              {route.id}
            </div>
            <div>
              <p style={{ fontWeight: 700, color: "#1B4332", fontSize: "0.95rem", marginBottom: 3 }}>
                {route.name}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: "0.75rem", color: "#6b7280", fontWeight: 500 }}>{firstStop}</span>
                <svg style={{ width: 12, height: 12, color: "rgba(27,67,50,0.3)", flexShrink: 0 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                <span style={{ fontSize: "0.75rem", color: "#6b7280", fontWeight: 500 }}>{lastStop}</span>
              </div>
            </div>
          </div>

          {/* Right: fare + chevron */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <FareBadge amount={route.fare} />
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "#f3f4f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
              }}
            >
              <svg style={{ width: 15, height: 15, color: "#9ca3af" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>
      </button>

      {/* Expandable stop list */}
      <div
        style={{
          maxHeight: expanded ? `${route.stops.length * 52 + 80}px` : "0px",
          opacity: expanded ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.35s ease, opacity 0.25s ease",
        }}
      >
        <div style={{ padding: "0 16px 16px" }}>
          {/* Divider */}
          <div style={{ height: 1, background: "rgba(27,67,50,0.06)", margin: "0 0 14px" }} />

          <p className="section-label" style={{ marginBottom: 14 }}>
            {route.stops.length} Stops
          </p>

          {/* Timeline */}
          <div style={{ position: "relative", paddingLeft: 28 }}>
            {/* Vertical connecting line */}
            <div
              style={{
                position: "absolute",
                left: 7,
                top: 10,
                bottom: 10,
                width: 2,
                borderRadius: 4,
                background: `linear-gradient(180deg, ${color} 0%, ${color}33 100%)`,
              }}
            />

            {route.stops.map((stop, idx) => {
              const isEndpoint = idx === 0 || idx === route.stops.length - 1;
              const dotSize = isEndpoint ? 14 : 9;

              return (
                <div
                  key={`${stop}-${idx}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    paddingTop: 6,
                    paddingBottom: 6,
                    position: "relative",
                  }}
                >
                  {/* Dot */}
                  <div
                    style={{
                      position: "absolute",
                      left: -(28 - (14 - dotSize) / 2),
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: dotSize,
                      height: dotSize,
                      borderRadius: "50%",
                      border: "2px solid #ffffff",
                      boxShadow: isEndpoint ? "0 2px 6px rgba(0,0,0,0.15)" : "none",
                      background: isEndpoint ? color : `${color}45`,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: isEndpoint ? 700 : 400,
                      color: isEndpoint ? "#0F2920" : "#6b7280",
                    }}
                  >
                    {stop}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
