import { useState } from "react";
import TopBar from "../components/TopBar";
import RouteCard from "../components/RouteCard";
import RouteMap from "../components/RouteMap";
import { tamtamRoutes } from "../data/routes";

export default function AllRoutes() {
  const [showMap, setShowMap] = useState(true);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>

      {/* ============================================================
          DESKTOP LAYOUT
          ============================================================ */}
      <div className="desktop-home-wrapper">
        <TopBar title="Browse Routes" showBack={false} />
        <div style={{ flex: 1, overflow: "hidden", display: "flex" }}>
          <div style={{ overflowY: "auto", padding: "22px 24px", background: "#f0f7f3", flex: 1, minWidth: 0 }}>
            <div className="page-enter" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="fade-in-up" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p className="section-label">{tamtamRoutes.length} active routes</p>
                  <p style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0F2920", marginTop: 3, letterSpacing: "-0.02em" }}>Gwalior Tamtam Network</p>
                </div>
                <div style={{ background: "rgba(27,67,50,0.05)", border: "1px solid rgba(27,67,50,0.06)", borderRadius: 9, padding: 3, display: "flex", gap: 3 }}>
                  {[["+ Map", true], ["List", false]].map(([label, val]) => (
                    <button key={String(val)} id={val ? "toggle-map-btn" : "toggle-list-btn"} onClick={() => setShowMap(Boolean(val))} className="btn-press" style={{ padding: "7px 13px", borderRadius: 7, fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", border: "none", cursor: "pointer", fontFamily: "var(--font-family-poppins)", ...(showMap === Boolean(val) ? { background: "#1B4332", color: "#fff" } : { background: "transparent", color: "#1B4332" }) }}>{label}</button>
                  ))}
                </div>
              </div>
              <div className="fade-in-up" style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", animationDelay: "0.05s" }}>
                {tamtamRoutes.map((route) => (
                  <div key={route.id} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <div style={{ width: 9, height: 9, borderRadius: "50%", background: route.color }} />
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#40916C" }}>{route.name}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }} className="stagger">
                {tamtamRoutes.map((route, index) => <RouteCard key={route.id} route={route} index={index} />)}
              </div>
              <div className="fade-in-up glass-card" style={{ padding: "16px 18px", animationDelay: "0.35s" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(27,67,50,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg style={{ width: 17, height: 17, color: "#40916C" }} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></svg>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0F2920", marginBottom: 4 }}>Route Information & Frequency</p>
                    <p style={{ fontSize: "0.72rem", color: "#6b7280", lineHeight: 1.65 }}>Fares are fixed approximate rates. Tamtams run from <span style={{ fontWeight: 700, color: "#2D6A4F" }}>6:00 AM to 9:00 PM</span>. Ask locals for nearest transit crossings.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showMap && (
            <div className="desktop-map-panel" style={{ position: "relative", overflow: "hidden", background: "#eaf4ef", borderLeft: "1px solid rgba(27,67,50,0.06)", width: 420, flexShrink: 0 }}>
              <div style={{ position: "absolute", inset: 0, padding: 18 }}>
                <RouteMap showAllRoutes allRoutes={tamtamRoutes} height="100%" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ============================================================
          MOBILE LAYOUT — App-native style
          ============================================================ */}
      <div className="mobile-home-wrapper">
        {/* Green hero header */}
        <div style={{ background: "linear-gradient(160deg, #0d3b2a 0%, #1B4332 100%)", padding: "52px 20px 22px", position: "relative", overflow: "hidden", flexShrink: 0 }}>
          <div style={{ position: "absolute", top: -30, right: -30, width: 140, height: 140, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
          <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Network</p>
          <h1 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 14 }}>
            Gwalior Tamtam<br />Routes
          </h1>
          {/* Route legend pills */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {tamtamRoutes.map((route) => (
              <div key={route.id} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 100, padding: "5px 10px" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: route.color, flexShrink: 0 }} />
                <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>{route.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: "auto", background: "#f4fbf7" }}>

          {/* Map toggle + preview */}
          <div style={{ padding: "16px 16px 0" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#4c665a", textTransform: "uppercase", letterSpacing: "0.08em" }}>{tamtamRoutes.length} Active Routes</p>
              <div style={{ background: "rgba(27,67,50,0.06)", borderRadius: 9, padding: 3, display: "flex", gap: 3 }}>
                <button id="toggle-map-btn" onClick={() => setShowMap(true)} className="btn-press" style={{ padding: "5px 11px", borderRadius: 7, fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", border: "none", cursor: "pointer", fontFamily: "var(--font-family-poppins)", ...(showMap ? { background: "#1B4332", color: "#fff" } : { background: "transparent", color: "#1B4332" }) }}>Map</button>
                <button id="toggle-list-btn" onClick={() => setShowMap(false)} className="btn-press" style={{ padding: "5px 11px", borderRadius: 7, fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", border: "none", cursor: "pointer", fontFamily: "var(--font-family-poppins)", ...(!showMap ? { background: "#1B4332", color: "#fff" } : { background: "transparent", color: "#1B4332" }) }}>List</button>
              </div>
            </div>

            {showMap && (
              <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(27,67,50,0.07)", marginBottom: 16, boxShadow: "0 2px 10px rgba(27,67,50,0.06)" }}>
                <RouteMap showAllRoutes allRoutes={tamtamRoutes} height="200px" />
              </div>
            )}
          </div>

          {/* Route cards */}
          <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 10 }}>
            {tamtamRoutes.map((route, index) => <RouteCard key={route.id} route={route} index={index} />)}
          </div>

          {/* Info card */}
          <div style={{ margin: "16px 16px 0" }}>
            <div style={{ background: "#fff", borderRadius: 18, padding: "16px 18px", border: "1px solid rgba(27,67,50,0.06)", boxShadow: "0 2px 8px rgba(27,67,50,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(27,67,50,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg style={{ width: 15, height: 15, color: "#40916C" }} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></svg>
                </div>
                <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0F2920" }}>Route & Fare Info</p>
              </div>
              <p style={{ fontSize: "0.75rem", color: "#6b7280", lineHeight: 1.65 }}>Fares are fixed approximate rates. Tamtams run from <span style={{ fontWeight: 700, color: "#2D6A4F" }}>6 AM to 9 PM</span> daily. Ask locals for nearest transit crossings.</p>
            </div>
          </div>

          <div className="mobile-bottom-spacer" />
        </div>
      </div>

    </div>
  );
}
