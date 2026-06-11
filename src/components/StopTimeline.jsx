export default function StopTimeline({ stops, exchangeStops = [] }) {
  const isExchangeStop = (stop) =>
    exchangeStops.some((ex) => ex.toLowerCase() === stop.toLowerCase());

  return (
    <div style={{ position: "relative", paddingLeft: 28, paddingTop: 6, paddingBottom: 6 }}>

      {/* Vertical connecting line */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 11,
          top: 18,
          bottom: 18,
          width: 2.5,
          borderRadius: 4,
          background: "linear-gradient(180deg, #2D6A4F 0%, #95D5B2 100%)",
        }}
      />

      {stops.map((stop, idx) => {
        const isExchange = isExchangeStop(stop);
        const isFirst = idx === 0;
        const isLast = idx === stops.length - 1;
        const isEndpoint = isFirst || isLast;

        // Dot sizing
        const dotSize = isExchange ? 22 : isEndpoint ? 18 : 11;
        const dotLeft = -(28 - (22 - dotSize) / 2 - 1);

        return (
          <div
            key={`${stop}-${idx}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              paddingTop: 8,
              paddingBottom: 8,
              position: "relative",
            }}
          >
            {/* Dot */}
            <div
              style={{
                position: "absolute",
                left: dotLeft,
                top: "50%",
                transform: "translateY(-50%)",
                width: dotSize,
                height: dotSize,
                borderRadius: "50%",
                border: "2.5px solid #ffffff",
                boxShadow: isExchange
                  ? "0 0 0 3px rgba(245,158,11,0.25), 0 2px 8px rgba(245,158,11,0.3)"
                  : isEndpoint
                  ? "0 2px 6px rgba(27,67,50,0.2)"
                  : "none",
                background: isExchange
                  ? "#F59E0B"
                  : isEndpoint
                  ? "linear-gradient(135deg, #1B4332, #2D6A4F)"
                  : "#ffffff",
                outline: !isExchange && !isEndpoint ? "2px solid rgba(64,145,108,0.4)" : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                zIndex: 1,
              }}
            >
              {isExchange && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2">
                  <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              )}
            </div>

            {/* Stop name + labels */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
              <span
                style={{
                  fontSize: "0.85rem",
                  fontWeight: isExchange ? 700 : isEndpoint ? 600 : 400,
                  color: isExchange ? "#d97706" : isEndpoint ? "#0F2920" : "#6b7280",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {stop}
              </span>

              {isExchange && (
                <span style={{
                  fontSize: "0.65rem", fontWeight: 700,
                  background: "rgba(245,158,11,0.12)", color: "#d97706",
                  padding: "2px 8px", borderRadius: 100,
                  flexShrink: 0,
                }}>
                  Exchange
                </span>
              )}
              {isFirst && !isExchange && (
                <span style={{
                  fontSize: "0.65rem", fontWeight: 700,
                  background: "rgba(27,67,50,0.08)", color: "#1B4332",
                  padding: "2px 8px", borderRadius: 100,
                  flexShrink: 0,
                }}>
                  Start
                </span>
              )}
              {isLast && !isExchange && (
                <span style={{
                  fontSize: "0.65rem", fontWeight: 700,
                  background: "rgba(27,67,50,0.08)", color: "#1B4332",
                  padding: "2px 8px", borderRadius: 100,
                  flexShrink: 0,
                }}>
                  End
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
