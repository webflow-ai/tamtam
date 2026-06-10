import { useState } from "react";
import TopBar from "../components/TopBar";
import RouteCard from "../components/RouteCard";
import RouteMap from "../components/RouteMap";
import { tamtamRoutes } from "../data/routes";

export default function AllRoutes() {
  const [showMap, setShowMap] = useState(true);

  return (
    <div className="flex-1 overflow-y-auto">
      <TopBar title="Browse Routes" />

      <div className="page-enter flex-1 px-4 pt-4">
        {/* Header */}
        <div className="fade-in-up flex items-center justify-between mb-4">
          <div>
            <p className="section-label">
              {tamtamRoutes.length} active routes
            </p>
            <p className="text-base font-extrabold text-primary-dark mt-0.5">
              Gwalior Tamtam Network
            </p>
          </div>

          {/* Toggle pill selector */}
          <div className="bg-primary/5 p-1 rounded-xl flex items-center gap-1 border border-primary/5">
            <button
              id="toggle-map-btn"
              onClick={() => setShowMap(!showMap)}
              className={`btn-press px-3.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                showMap
                  ? "bg-primary text-white shadow-sm"
                  : "text-primary hover:bg-primary/5"
              }`}
            >
              Map View
            </button>
            <button
              id="toggle-list-btn"
              onClick={() => setShowMap(false)}
              className={`btn-press px-3.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                !showMap
                  ? "bg-primary text-white shadow-sm"
                  : "text-primary hover:bg-primary/5"
              }`}
            >
              List Only
            </button>
          </div>
        </div>

        {/* Network map */}
        {showMap && (
          <div className="fade-in-up mb-4 overflow-hidden rounded-2xl border border-primary/5 shadow-xs">
            <RouteMap
              showAllRoutes
              allRoutes={tamtamRoutes}
              height="180px"
            />
          </div>
        )}

        {/* Route legend */}
        <div className="fade-in-up flex items-center gap-3 mb-4 px-1" style={{ animationDelay: "0.08s" }}>
          {tamtamRoutes.map((route) => (
            <div key={route.id} className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-full shadow-xs"
                style={{ background: route.color }}
              />
              <span className="text-[10px] font-bold text-primary-soft">
                {route.name}
              </span>
            </div>
          ))}
        </div>

        {/* Route list */}
        <div className="space-y-3 stagger">
          {tamtamRoutes.map((route, index) => (
            <RouteCard key={route.id} route={route} index={index} />
          ))}
        </div>

        {/* Info footer */}
        <div
          className="fade-in-up glass-card p-4 mt-5"
          style={{ animationDelay: "0.35s" }}
        >
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-primary/6 flex items-center justify-center shrink-0">
              <svg
                className="w-4.5 h-4.5 text-primary-soft"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-primary-dark mb-0.5">Route Information & Frequency</p>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Fares are fixed approximate rates. Tamtams run frequently from{" "}
                <span className="font-bold text-primary-soft">6:00 AM to 9:00 PM</span>. If you experience long wait times, ask locals for nearest transit crossings.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to clear bottom navigation */}
      <div className="h-24 shrink-0" />
    </div>
  );
}
