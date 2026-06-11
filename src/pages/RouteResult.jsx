import { useSearchParams, useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import StopTimeline from "../components/StopTimeline";
import FareBadge from "../components/FareBadge";
import RouteMap from "../components/RouteMap";
import { findRoute } from "../utils/findRoute";
import { tamtamRoutes } from "../data/routes";

export default function RouteResult() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const source = searchParams.get("source") || "";
  const destination = searchParams.get("destination") || "";
  const result = findRoute(source, destination, tamtamRoutes);

  const SegmentsList = () => (
    <>
      {result && result.segments.map((segment, idx) => (
        <div key={`${segment.routeId}-${idx}`} className="glass-card-solid" style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px 9px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <div style={{
                width: 34, height: 34, borderRadius: 9,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", fontWeight: 800, fontSize: "0.78rem",
                background: `linear-gradient(135deg, ${{"01":"#2D6A4F","02":"#1B4332","03":"#40916C"}[segment.routeId]||"#1B4332"}, ${{"01":"#1B4332","02":"#0F2920","03":"#2D6A4F"}[segment.routeId]||"#2D6A4F"})`,
              }}>
                {segment.routeId}
              </div>
              <div>
                <p style={{ fontSize: "0.82rem", fontWeight: 800, color: "#0F2920" }}>Board {segment.routeName}</p>
                <p style={{ fontSize: "0.68rem", color: "#9ca3af", marginTop: 2, display: "flex", alignItems: "center", gap: 5 }}>
                  <span>Segment {idx + 1} of {result.segments.length}</span>
                  <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#d1d5db", display: "inline-block" }} />
                  <span>{segment.stops.length} stops</span>
                </p>
              </div>
            </div>
            <FareBadge amount={segment.fare} />
          </div>
          <div style={{ padding: "0 16px 14px" }}>
            <StopTimeline stops={segment.stops} exchangeStops={result.exchangeStops || []} />
          </div>
        </div>
      ))}
    </>
  );

  const NoResult = () => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "48px 20px" }}>
      <div style={{ width: 64, height: 64, borderRadius: 18, background: "#fff", border: "1px solid rgba(27,67,50,0.06)", boxShadow: "0 4px 16px rgba(27,67,50,0.06)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
        <svg style={{ width: 30, height: 30, color: "#9ca3af" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><path d="M16 16s-1.5-2-4-2-4 2-4 2M9 9h.01M15 9h.01" />
        </svg>
      </div>
      <p style={{ fontSize: "1rem", fontWeight: 800, color: "#0F2920", marginBottom: 6 }}>No routes found</p>
      <p style={{ fontSize: "0.78rem", color: "#6b7280", lineHeight: 1.6, maxWidth: 260, marginBottom: 20 }}>
        We couldn't connect these stops. Please check spelling or try nearby stops.
      </p>
      <button id="try-again-btn" onClick={() => navigate("/search")} className="btn-press" style={{ padding: "11px 26px", background: "linear-gradient(135deg, #1B4332, #2D6A4F)", color: "#fff", fontWeight: 700, fontSize: "0.85rem", border: "none", borderRadius: 11, cursor: "pointer", fontFamily: "var(--font-family-poppins)", boxShadow: "0 4px 14px rgba(27,67,50,0.2)" }}>
        Try Another Stops
      </button>
    </div>
  );

  const RouteBanner = () => result && (
    result.exchangeStops && result.exchangeStops.length > 0 ? (
      <div style={{ borderRadius: 13, padding: "13px 16px", display: "flex", alignItems: "center", gap: 12, border: "1px solid rgba(245,158,11,0.15)", background: "rgba(245,158,11,0.05)" }}>
        <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg, #F59E0B, #d97706)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", flexShrink: 0 }}>
          <svg style={{ width: 14, height: 14 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" /></svg>
        </div>
        <div>
          <p style={{ fontSize: "0.8rem", fontWeight: 800, color: "#78350f" }}>Requires {result.exchangeStops.length} exchange{result.exchangeStops.length > 1 ? "s" : ""}</p>
          <p style={{ fontSize: "0.72rem", color: "rgba(120,53,15,0.75)", marginTop: 2, lineHeight: 1.5 }}>
            Change at {result.exchangeStops.map((s, i) => <span key={s}><strong>{s}</strong>{i < result.exchangeStops.length - 1 && " & "}</span>)}
          </p>
        </div>
      </div>
    ) : (
      <div style={{ borderRadius: 13, padding: "13px 16px", display: "flex", alignItems: "center", gap: 12, border: "1px solid rgba(34,197,94,0.12)", background: "rgba(34,197,94,0.05)" }}>
        <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg, #1B4332, #2D6A4F)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", flexShrink: 0 }}>
          <svg style={{ width: 14, height: 14 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </div>
        <div>
          <p style={{ fontSize: "0.8rem", fontWeight: 800, color: "#14532d" }}>Direct Route</p>
          <p style={{ fontSize: "0.72rem", color: "rgba(20,83,45,0.7)", marginTop: 2 }}>No transit changes — sit back & enjoy!</p>
        </div>
      </div>
    )
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>

      {/* ============================================================
          DESKTOP LAYOUT
          ============================================================ */}
      <div className="desktop-home-wrapper">
        <TopBar title="Commute Route" />
        <div style={{ flex: 1, overflow: "hidden", display: "flex" }}>
          <div className="result-panel" style={{ overflowY: "auto", padding: "22px", background: "#ffffff", borderRight: "1px solid rgba(27,67,50,0.06)", flexShrink: 0 }}>
            <div className="page-enter" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="fade-in-up glass-card" style={{ padding: "18px 20px" }}>
                <p className="section-label" style={{ marginBottom: 8 }}>Commute Plan</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <div style={{ width: 9, height: 9, borderRadius: "50%", border: "2px solid #1B4332", background: "#fff", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0F2920" }}>{source}</span>
                  </div>
                  <svg style={{ width: 14, height: 14, color: "rgba(64,145,108,0.4)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <svg style={{ width: 11, height: 11, color: "#F59E0B" }} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /></svg>
                    <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0F2920" }}>{destination}</span>
                  </div>
                  {result && <div style={{ marginLeft: "auto" }}><FareBadge amount={result.totalFare} large /></div>}
                </div>
              </div>
              {!result ? <NoResult /> : (
                <>
                  <RouteBanner />
                  <div style={{ display: "flex", flexDirection: "column", gap: 11 }} className="stagger"><SegmentsList /></div>
                  <button id="search-again-btn" onClick={() => navigate("/search")} className="fade-in-up btn-press" style={{ width: "100%", padding: 13, marginTop: 2, borderRadius: 11, background: "#fff", border: "1px solid rgba(27,67,50,0.1)", color: "#1B4332", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer", fontFamily: "var(--font-family-poppins)", boxShadow: "0 1px 4px rgba(27,67,50,0.05)" }}>
                    Plan Another Commute
                  </button>
                </>
              )}
            </div>
          </div>
          {result && (
            <div className="desktop-map-panel" style={{ position: "relative", flex: 1, overflow: "hidden", background: "#eaf4ef" }}>
              <div style={{ position: "absolute", inset: 0, padding: 18 }}>
                <RouteMap segments={result.segments} exchangeStops={result.exchangeStops || []} height="100%" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ============================================================
          MOBILE LAYOUT — App-native style
          ============================================================ */}
      <div className="mobile-home-wrapper">
        {/* Hero header */}
        <div style={{ background: "linear-gradient(160deg, #0d3b2a 0%, #1B4332 100%)", padding: "52px 20px 22px", position: "relative", overflow: "hidden", flexShrink: 0 }}>
          <div style={{ position: "absolute", top: -30, right: -30, width: 140, height: 140, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
          <button onClick={() => navigate(-1)} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-family-poppins)", padding: 0, marginBottom: 16 }}>
            <svg style={{ width: 16, height: 16 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            <span style={{ fontSize: "0.78rem", fontWeight: 600 }}>Back</span>
          </button>
          <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Commute Route</p>
          {/* Journey summary pill */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 14, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, flex: 1, border: "1px solid rgba(255,255,255,0.1)" }}>
              <div>
                <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", marginBottom: 2 }}>From</p>
                <p style={{ fontSize: "0.9rem", fontWeight: 800, color: "#fff" }}>{source}</p>
              </div>
              <svg style={{ width: 18, height: 18, color: "rgba(255,255,255,0.3)", flexShrink: 0 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              <div>
                <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", marginBottom: 2 }}>To</p>
                <p style={{ fontSize: "0.9rem", fontWeight: 800, color: "#fff" }}>{destination}</p>
              </div>
            </div>
            {result && <FareBadge amount={result.totalFare} large />}
          </div>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: "auto", background: "#f4fbf7" }}>
          {!result ? (
            <div style={{ background: "#fff", margin: "16px 16px 0", borderRadius: 20, boxShadow: "0 4px 16px rgba(27,67,50,0.08)" }}><NoResult /></div>
          ) : (
            <div style={{ padding: "16px" }}>
              {/* Map preview */}
              <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(27,67,50,0.07)", marginBottom: 14, boxShadow: "0 2px 10px rgba(27,67,50,0.06)" }}>
                <RouteMap segments={result.segments} exchangeStops={result.exchangeStops || []} height="180px" />
              </div>

              {/* Route type banner */}
              <div style={{ marginBottom: 14 }}><RouteBanner /></div>

              {/* Segments */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <SegmentsList />
              </div>

              <button id="search-again-btn" onClick={() => navigate("/search")} className="btn-press" style={{ width: "100%", padding: "13px", marginTop: 14, borderRadius: 14, background: "#fff", border: "1.5px solid rgba(27,67,50,0.1)", color: "#1B4332", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer", fontFamily: "var(--font-family-poppins)", boxShadow: "0 2px 8px rgba(27,67,50,0.06)" }}>
                Plan Another Commute
              </button>
            </div>
          )}
          <div className="mobile-bottom-spacer" />
        </div>
      </div>

    </div>
  );
}
