import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import TopBar from "../components/TopBar";
import RouteMap from "../components/RouteMap";
import { getAllStops, tamtamRoutes } from "../data/routes";

const allStops = getAllStops().sort((a, b) => a.localeCompare(b));

function getRecentSearches() {
  try { return JSON.parse(localStorage.getItem("tamtam_recent") || "[]"); }
  catch { return []; }
}

function saveRecentSearch(source, destination) {
  const recent = getRecentSearches();
  const entry = { source, destination, timestamp: Date.now() };
  const filtered = recent.filter(
    (r) => !(r.source.toLowerCase() === source.toLowerCase() && r.destination.toLowerCase() === destination.toLowerCase())
  );
  filtered.unshift(entry);
  localStorage.setItem("tamtam_recent", JSON.stringify(filtered.slice(0, 5)));
}

function AutocompleteInput({ id, placeholder, value, onChange, accentColor = "#1B4332" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const filtered = value.trim()
    ? allStops.filter((s) => s.toLowerCase().includes(value.toLowerCase()))
    : allStops;

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const highlight = (text, query) => {
    if (!query.trim()) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (<>{text.slice(0, idx)}<span style={{ fontWeight: 800, color: accentColor }}>{text.slice(idx, idx + query.length)}</span>{text.slice(idx + query.length)}</>);
  };

  return (
    <div ref={ref} style={{ position: "relative", flex: 1 }}>
      <div style={{ position: "relative" }}>
        <input
          id={id} type="text" value={value} autoComplete="off"
          onChange={(e) => { onChange(e.target.value); setOpen(true); }}
          onFocus={(e) => {
            e.target.style.borderColor = "rgba(27,67,50,0.3)";
            e.target.style.background = "#fff";
            setOpen(true);
          }}
          onClick={() => setOpen(true)}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(27,67,50,0.1)";
            e.target.style.background = "#f8fdf9";
          }}
          placeholder={placeholder}
          style={{ width: "100%", padding: "11px 36px 11px 13px", border: "1.5px solid rgba(27,67,50,0.1)", borderRadius: "11px", fontSize: "0.88rem", fontWeight: 600, color: "#0F2920", fontFamily: "var(--font-family-poppins)", background: "#f8fdf9", outline: "none", transition: "border-color 0.2s, background 0.2s" }}
        />
        {value && (
          <button onClick={() => { onChange(""); setOpen(false); }} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9ca3af", display: "flex", padding: 0 }}>
            <svg style={{ width: 15, height: 15 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        )}
      </div>
      {open && filtered.length > 0 && (
        <div className="autocomplete-dropdown">
          {filtered.map((stop) => (
            <div key={stop} className="autocomplete-item" onMouseDown={() => { onChange(stop); setOpen(false); }}>
              <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg style={{ width: 13, height: 13, color: "rgba(27,67,50,0.3)", flexShrink: 0 }} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
                </svg>
                <span style={{ fontWeight: 500 }}>{highlight(stop, value)}</span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Shared planner form (used on both layouts)
function PlannerForm({ source, setSource, destination, setDestination, canSearch, onFind }) {
  return (
    <div style={{ background: "#fff", border: "1px solid rgba(27,67,50,0.08)", borderRadius: 16, padding: 18, boxShadow: "0 2px 12px rgba(27,67,50,0.05)" }}>
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="source-input" style={{ fontSize: "0.62rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 7 }}>📍 Start Point</label>
        <AutocompleteInput id="source-input" placeholder="Enter starting stop..." value={source} onChange={setSource} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{ flex: 1, height: 1, background: "rgba(27,67,50,0.06)" }} />
        <button
          id="swap-stops-btn"
          onClick={() => { const t = source; setSource(destination); setDestination(t); }}
          className="btn-press"
          style={{ width: 32, height: 32, borderRadius: "50%", background: "#fff", border: "1.5px solid rgba(27,67,50,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#1B4332", boxShadow: "0 1px 5px rgba(27,67,50,0.08)" }}
        >
          <svg style={{ width: 13, height: 13 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </button>
        <div style={{ flex: 1, height: 1, background: "rgba(27,67,50,0.06)" }} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="destination-input" style={{ fontSize: "0.62rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 7 }}>🏁 Destination</label>
        <AutocompleteInput id="destination-input" placeholder="Enter destination stop..." value={destination} onChange={setDestination} />
      </div>
      <button
        id="find-route-btn"
        onClick={onFind}
        disabled={!canSearch}
        className="btn-press shimmer-overlay"
        style={{ width: "100%", padding: 13, borderRadius: 11, fontWeight: 700, fontSize: "0.88rem", border: "none", cursor: canSearch ? "pointer" : "not-allowed", fontFamily: "var(--font-family-poppins)", ...(canSearch ? { background: "linear-gradient(135deg, #1B4332, #2D6A4F)", color: "#fff", boxShadow: "0 4px 14px rgba(27,67,50,0.22)" } : { background: "#f3f4f6", color: "#d1d5db" }) }}
      >
        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, position: "relative", zIndex: 1 }}>
          <svg style={{ width: 15, height: 15 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
          Find Transit Routes
        </span>
      </button>
    </div>
  );
}

export default function Search() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [source, setSource] = useState(searchParams.get("source") || "");
  const [destination, setDestination] = useState(searchParams.get("destination") || "");
  const [recentSearches] = useState(getRecentSearches);

  const canSearch = source.trim() && destination.trim();
  const handleFindRoute = () => {
    if (canSearch) {
      saveRecentSearch(source.trim(), destination.trim());
      navigate(`/route?source=${encodeURIComponent(source.trim())}&destination=${encodeURIComponent(destination.trim())}`);
    }
  };

  const suggested = [["City Centre", "Maharaja Bada"], ["Phoolbagh", "Thatipur"], ["Kampu", "Gwalior Fort"], ["Lashkar", "MLB College"]];

  const RecentAndSuggested = () => (
    <>
      {recentSearches.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <p className="section-label" style={{ marginBottom: 10 }}>Recent Searches</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {recentSearches.slice(0, 3).map((search, idx) => (
              <button key={idx} onClick={() => { setSource(search.source); setDestination(search.destination); }} className="btn-press" style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 13px", background: "#fff", border: "1px solid rgba(27,67,50,0.07)", borderRadius: 11, cursor: "pointer", textAlign: "left", boxShadow: "0 1px 4px rgba(27,67,50,0.03)" }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(27,67,50,0.05)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg style={{ width: 13, height: 13, color: "#40916C" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                </div>
                <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#0F2920", flex: 1 }}>{search.source} <span style={{ color: "#40916C", fontWeight: 400 }}>→</span> {search.destination}</p>
                <svg style={{ width: 13, height: 13, color: "#d1d5db" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            ))}
          </div>
        </div>
      )}
      <div style={{ marginTop: 18 }}>
        <p className="section-label" style={{ marginBottom: 10 }}>Suggested Commutes</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {suggested.map(([from, to]) => (
            <button key={`${from}-${to}`} onClick={() => { setSource(from); setDestination(to); }} className="btn-press chip" style={{ background: "#fff", border: "1px solid rgba(27,67,50,0.08)", color: "#2D6A4F", cursor: "pointer", boxShadow: "0 1px 3px rgba(27,67,50,0.03)", fontSize: "0.75rem" }}>
              <svg style={{ width: 11, height: 11, color: "rgba(27,67,50,0.3)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              {from} → {to}
            </button>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>

      {/* ============================================================
          DESKTOP LAYOUT
          ============================================================ */}
      <div className="desktop-home-wrapper" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <TopBar title="Plan Commute" rightIcon={
          <button id="view-routes-btn" onClick={() => navigate("/routes")} style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(27,67,50,0.05)", border: "1px solid rgba(27,67,50,0.1)", borderRadius: "9px", padding: "7px 13px", cursor: "pointer", color: "#1B4332", fontFamily: "var(--font-family-poppins)", fontSize: "0.78rem", fontWeight: 700 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>
            Routes
          </button>
        } />
        <div style={{ flex: 1, overflow: "hidden", display: "flex" }}>
          <div className="search-panel" style={{ overflowY: "auto", padding: "22px", background: "#ffffff", borderRight: "1px solid rgba(27,67,50,0.06)", flexShrink: 0 }}>
            <div className="page-enter" style={{ display: "flex", flexDirection: "column" }}>
              <div className="fade-in-up glass-card" style={{ padding: "14px 16px", marginBottom: 18 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(27,67,50,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg style={{ width: 17, height: 17, color: "#40916C" }} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" /></svg>
                    </div>
                    <div>
                      <p style={{ fontSize: "0.62rem", color: "#9ca3af", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Nearest Hub</p>
                      <p style={{ fontSize: "0.9rem", fontWeight: 800, color: "#0F2920" }}>Phoolbagh</p>
                    </div>
                  </div>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 100, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.15)" }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e" }} />
                    <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#15803d" }}>~200m away</span>
                  </span>
                </div>
              </div>
              <div className="fade-in-up" style={{ animationDelay: "0.07s", marginBottom: 18 }}>
                <h3 style={{ fontSize: "0.88rem", fontWeight: 800, color: "#0F2920", marginBottom: 12 }}>Route Planner</h3>
                <PlannerForm source={source} setSource={setSource} destination={destination} setDestination={setDestination} canSearch={canSearch} onFind={handleFindRoute} />
              </div>
              <RecentAndSuggested />
            </div>
          </div>
          <div className="desktop-map-panel" style={{ position: "relative", flex: 1, overflow: "hidden", background: "#eaf4ef" }}>
            <div style={{ position: "absolute", inset: 0, padding: 18 }}>
              <RouteMap showAllRoutes allRoutes={tamtamRoutes} height="100%" />
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          MOBILE LAYOUT — App-native style
          ============================================================ */}
      <div className="mobile-home-wrapper">
        {/* Green hero header with search form */}
        <div style={{ background: "linear-gradient(160deg, #0d3b2a 0%, #1B4332 100%)", padding: "52px 20px 24px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -30, right: -30, width: 140, height: 140, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
            <svg style={{ width: 16, height: 16, color: "rgba(255,255,255,0.6)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.01em" }}>Plan Your Commute</h2>
          </div>
          {/* Nearest hub badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 100, padding: "5px 12px", marginBottom: 16 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#52d48a", boxShadow: "0 0 6px rgba(82,212,138,0.8)" }} />
            <span style={{ fontSize: "0.68rem", fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>Nearest hub: Phoolbagh (~200m)</span>
          </div>
        </div>

        {/* White card that overlaps the hero — form + content */}
        <div style={{ flex: 1, overflowY: "auto", background: "#f4fbf7", marginTop: -1 }}>
          <div style={{ background: "#fff", margin: "0 16px", borderRadius: 20, padding: 18, marginTop: -20, boxShadow: "0 8px 30px rgba(27,67,50,0.10)", position: "relative", zIndex: 5 }}>
            <PlannerForm source={source} setSource={setSource} destination={destination} setDestination={setDestination} canSearch={canSearch} onFind={handleFindRoute} />
          </div>
          <div style={{ padding: "4px 16px 0" }}>
            <RecentAndSuggested />
          </div>
          <div className="mobile-bottom-spacer" />
        </div>
      </div>

    </div>
  );
}
