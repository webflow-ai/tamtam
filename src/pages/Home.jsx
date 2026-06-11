import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const stats = [
    { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", label: "3 Routes", sub: "Active" },
    { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z", label: "10 Stops", sub: "City-wide" },
    { icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", label: "₹10+", sub: "From" },
  ];

  const destinations = [
    { name: "Gwalior Fort", desc: "Heritage Site & Tourist Landmark", route: "01", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", stops: "Gwalior Fort" },
    { name: "Maharaja Bada", desc: "Central Market & Business Hub", route: "02", icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z", stops: "Maharaja Bada" },
    { name: "Gwalior Junction", desc: "Primary Transit Terminal", route: "01", icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4", stops: "City Centre" },
  ];

  const quickRoutes = [
    ["City Centre", "Maharaja Bada"],
    ["Phoolbagh", "Thatipur"],
    ["Kampu", "Gwalior Fort"],
    ["Lashkar", "MLB College"],
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>

      {/* ============================================================
          DESKTOP LAYOUT (hidden on mobile via CSS)
          ============================================================ */}
      <div className="desktop-home-wrapper" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div className="desktop-topbar">
          <div className="desktop-topbar-title"><h2>Dashboard</h2></div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#6b7280" }}>Gwalior Tamtam Network</span>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(27,67,50,0.05)", padding: "5px 11px", borderRadius: "100px", border: "1px solid rgba(27,67,50,0.08)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
              <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#15803d", textTransform: "uppercase", letterSpacing: "0.06em" }}>Live</span>
            </div>
          </div>
        </div>

        <div className="page-body page-enter">
          <div className="desktop-three-col fade-in-up" style={{ marginBottom: "20px" }}>
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className="stat-card-icon">
                  <svg style={{ width: 22, height: 22, color: "#1B4332" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d={stat.icon} /></svg>
                </div>
                <div>
                  <p style={{ fontSize: "1rem", fontWeight: 800, color: "#0F2920", lineHeight: 1.1 }}>{stat.label}</p>
                  <p style={{ fontSize: "0.72rem", color: "#6b7280", marginTop: 3 }}>{stat.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="desktop-two-col fade-in-up" style={{ animationDelay: "0.06s" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div>
                <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0F2920", marginBottom: "10px", letterSpacing: "-0.02em" }}>Plan Your Commute</h2>
                <button onClick={() => navigate("/search")} className="btn-press" style={{ width: "100%", background: "#fff", border: "1.5px solid rgba(27,67,50,0.1)", borderRadius: "13px", padding: "13px 16px", display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", boxShadow: "0 2px 8px rgba(27,67,50,0.05)" }}>
                  <svg style={{ width: 17, height: 17, color: "#9ca3af", flexShrink: 0 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                  <span style={{ color: "#9ca3af", fontWeight: 600, fontSize: "0.88rem" }}>Search destination or stop...</span>
                </button>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0F2920" }}>Popular Destinations</h3>
                  <button onClick={() => navigate("/routes")} style={{ fontSize: "0.78rem", fontWeight: 700, color: "#2D6A4F", background: "none", border: "none", cursor: "pointer" }}>View All →</button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                  {destinations.map((dest, idx) => (
                    <button key={idx} onClick={() => navigate(`/search?destination=${encodeURIComponent(dest.stops)}`)} className="btn-press" style={{ width: "100%", background: "#fff", border: "1px solid rgba(27,67,50,0.07)", borderRadius: "13px", padding: "13px 15px", display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", boxShadow: "0 1px 5px rgba(27,67,50,0.04)", textAlign: "left" }}>
                      <div style={{ width: 42, height: 42, borderRadius: "11px", background: "#D8F3DC", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg style={{ width: 19, height: 19, color: "#1B4332" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d={dest.icon} /></svg>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: "0.88rem", fontWeight: 700, color: "#0F2920", marginBottom: 2 }}>{dest.name}</p>
                        <p style={{ fontSize: "0.72rem", color: "#6b7280" }}>{dest.desc}</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "7px", flexShrink: 0 }}>
                        <span style={{ padding: "3px 9px", background: "#1B4332", color: "white", fontSize: "0.62rem", fontWeight: 700, borderRadius: "100px", textTransform: "uppercase" }}>ROUTE {dest.route}</span>
                        <svg style={{ width: 13, height: 13, color: "#9ca3af" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div style={{ background: "linear-gradient(135deg, #0f3d30 0%, #1a5c48 100%)", borderRadius: "18px", padding: "22px", color: "white" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "7px" }}>
                  <svg style={{ width: 18, height: 18 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                  <h3 style={{ fontSize: "0.92rem", fontWeight: 700 }}>Service Hours</h3>
                </div>
                <p style={{ fontSize: "1.45rem", fontWeight: 800, marginBottom: "14px", letterSpacing: "-0.03em" }}>6:00 AM – 9:00 PM</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.15)" }}>
                  <div><p style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginBottom: 3 }}>Peak</p><p style={{ fontSize: "0.85rem", fontWeight: 700 }}>Every 10–15 mins</p></div>
                  <div><p style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginBottom: 3 }}>Off-Peak</p><p style={{ fontSize: "0.85rem", fontWeight: 700 }}>Every 25 mins</p></div>
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0F2920", marginBottom: "12px" }}>Quick Commutes</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "9px" }}>
                  {quickRoutes.map(([from, to]) => (
                    <button key={`${from}-${to}`} onClick={() => navigate(`/search?source=${encodeURIComponent(from)}&destination=${encodeURIComponent(to)}`)} className="btn-press" style={{ background: "#fff", border: "1px solid rgba(27,67,50,0.08)", borderRadius: "11px", padding: "12px 13px", cursor: "pointer", textAlign: "left", boxShadow: "0 1px 4px rgba(27,67,50,0.04)" }}>
                      <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#0F2920", marginBottom: 3 }}>{from}</p>
                      <p style={{ fontSize: "0.68rem", color: "#40916C" }}>→ {to}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          MOBILE LAYOUT — App-native style (hidden on desktop via CSS)
          ============================================================ */}
      <div className="mobile-home-wrapper">

        {/* Hero Header */}
        <div style={{
          background: "linear-gradient(160deg, #0d3b2a 0%, #1B4332 55%, #2D6A4F 100%)",
          padding: "52px 20px 28px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Decorative circles */}
          <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
          <div style={{ position: "absolute", top: 20, right: 20, width: 90, height: 90, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />

          {/* Top bar row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.15)" }}>
                <svg style={{ width: 18, height: 18, color: "white" }} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                </svg>
              </div>
              <div>
                <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em", lineHeight: 1 }}>TamTam</p>
                <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.55)", marginTop: 1, fontWeight: 500 }}>Gwalior Transit</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(82,212,138,0.15)", padding: "5px 10px", borderRadius: 100, border: "1px solid rgba(82,212,138,0.25)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#52d48a", display: "block", boxShadow: "0 0 6px rgba(82,212,138,0.8)" }} />
              <span style={{ fontSize: "0.62rem", fontWeight: 700, color: "#52d48a", textTransform: "uppercase", letterSpacing: "0.06em" }}>Live</span>
            </div>
          </div>

          {/* Greeting */}
          <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", fontWeight: 500, marginBottom: 4 }}>Good day! Where are you heading?</p>
          <h1 style={{ fontSize: "1.55rem", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.03em", marginBottom: 20, lineHeight: 1.2 }}>
            Plan your ride<br />across Gwalior
          </h1>

          {/* Search CTA */}
          <button
            onClick={() => navigate("/search")}
            className="btn-press"
            style={{
              width: "100%",
              background: "#ffffff",
              borderRadius: 16,
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
            }}
          >
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "#D8F3DC", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg style={{ width: 18, height: 18, color: "#1B4332" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
            </div>
            <span style={{ color: "#9ca3af", fontWeight: 600, fontSize: "0.92rem", flex: 1, textAlign: "left" }}>Where do you want to go?</span>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: "#1B4332", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg style={{ width: 14, height: 14, color: "white" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </div>
          </button>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: "auto", background: "#f4fbf7" }}>

          {/* Stats strip */}
          <div style={{ display: "flex", gap: 10, padding: "16px 16px 0", overflowX: "auto" }}>
            {[
              { label: "3", sub: "Routes", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
              { label: "10", sub: "Stops", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" },
              { label: "₹10", sub: "Min Fare", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
              { label: "15m", sub: "Peak Freq", icon: "M12 6v6l4 2M12 2a10 10 0 100 20A10 10 0 0012 2z" },
            ].map((s, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 14, padding: "13px 16px", minWidth: 80, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", border: "1px solid rgba(27,67,50,0.06)", boxShadow: "0 1px 6px rgba(27,67,50,0.04)" }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: "#D8F3DC", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
                  <svg style={{ width: 16, height: 16, color: "#1B4332" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d={s.icon} /></svg>
                </div>
                <p style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0F2920", lineHeight: 1 }}>{s.label}</p>
                <p style={{ fontSize: "0.6rem", color: "#9ca3af", fontWeight: 600, marginTop: 2, textTransform: "uppercase", letterSpacing: "0.04em" }}>{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Quick Commutes horizontal scroll */}
          <div style={{ padding: "18px 16px 0" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#4c665a", textTransform: "uppercase", letterSpacing: "0.08em" }}>Quick Commutes</p>
            </div>
            <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
              {quickRoutes.map(([from, to]) => (
                <button
                  key={`${from}-${to}`}
                  onClick={() => navigate(`/search?source=${encodeURIComponent(from)}&destination=${encodeURIComponent(to)}`)}
                  className="btn-press"
                  style={{ background: "#fff", border: "1px solid rgba(27,67,50,0.08)", borderRadius: 12, padding: "10px 14px", cursor: "pointer", flexShrink: 0, textAlign: "left", boxShadow: "0 1px 4px rgba(27,67,50,0.04)" }}
                >
                  <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#0F2920", whiteSpace: "nowrap" }}>{from}</p>
                  <p style={{ fontSize: "0.68rem", color: "#40916C", marginTop: 2, whiteSpace: "nowrap" }}>→ {to}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Popular Destinations */}
          <div style={{ padding: "18px 16px 0" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#4c665a", textTransform: "uppercase", letterSpacing: "0.08em" }}>Popular Destinations</p>
              <button onClick={() => navigate("/routes")} style={{ fontSize: "0.78rem", fontWeight: 700, color: "#2D6A4F", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-family-poppins)" }}>All Routes</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {destinations.map((dest, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate(`/search?destination=${encodeURIComponent(dest.stops)}`)}
                  className="btn-press"
                  style={{ width: "100%", background: "#fff", border: "1px solid rgba(27,67,50,0.07)", borderRadius: 16, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", textAlign: "left", boxShadow: "0 2px 8px rgba(27,67,50,0.05)" }}
                >
                  <div style={{ width: 46, height: 46, borderRadius: 13, background: "linear-gradient(135deg, #D8F3DC, #B7E4C7)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg style={{ width: 22, height: 22, color: "#1B4332" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d={dest.icon} /></svg>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: "0.92rem", fontWeight: 700, color: "#0F2920", marginBottom: 3 }}>{dest.name}</p>
                    <p style={{ fontSize: "0.73rem", color: "#6b7280", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{dest.desc}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
                    <span style={{ padding: "3px 10px", background: "#1B4332", color: "white", fontSize: "0.6rem", fontWeight: 700, borderRadius: 100, textTransform: "uppercase", letterSpacing: "0.05em" }}>RT {dest.route}</span>
                    <svg style={{ width: 14, height: 14, color: "#9ca3af" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M9 18l6-6-6-6" /></svg>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Service Hours card */}
          <div style={{ padding: "18px 16px" }}>
            <div style={{ background: "linear-gradient(135deg, #0f3d30 0%, #1a5c48 100%)", borderRadius: 20, padding: "20px", color: "white" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
                    <svg style={{ width: 16, height: 16 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                    <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "rgba(255,255,255,0.65)" }}>Service Hours</p>
                  </div>
                  <p style={{ fontSize: "1.2rem", fontWeight: 800, letterSpacing: "-0.02em" }}>6 AM – 9 PM daily</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 3 }}>Peak</p>
                  <p style={{ fontSize: "0.85rem", fontWeight: 700 }}>10–15 min</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom spacer for nav */}
          <div className="mobile-bottom-spacer" />
        </div>
      </div>

    </div>
  );
}
