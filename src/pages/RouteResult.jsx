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

  return (
    <div className="flex-1 overflow-y-auto">
      <TopBar title="Commute Route" />

      <div className="page-enter flex-1 px-4 pt-4">
        {/* Journey header card */}
        <div className="fade-in-up glass-card p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="section-label">Commute Plan</p>
              <div className="flex items-center gap-2.5 mt-2.5">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-primary bg-white shrink-0" />
                  <span className="text-sm font-extrabold text-primary-dark truncate">{source}</span>
                </div>
                <svg className="w-4 h-4 text-primary-soft/30 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                <div className="flex items-center gap-2 min-w-0">
                  <svg className="w-3.5 h-3.5 text-accent shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  </svg>
                  <span className="text-sm font-extrabold text-primary-dark truncate">{destination}</span>
                </div>
              </div>
            </div>
            {result && (
              <div className="shrink-0 ml-3">
                <FareBadge amount={result.totalFare} large />
              </div>
            )}
          </div>
        </div>

        {/* No route found */}
        {!result && (
          <div className="fade-in-up flex flex-col items-center justify-center py-12 text-center">
            <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center border border-primary/5 shadow-xs mb-5">
              <svg
                className="w-10 h-10 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M16 16s-1.5-2-4-2-4 2-4 2M9 9h.01M15 9h.01" />
              </svg>
            </div>
            <p className="text-primary-dark font-extrabold text-lg mb-1">
              No direct or exchange routes found
            </p>
            <p className="text-gray-400 text-xs max-w-[240px] leading-relaxed">
              We couldn't connect these stops in our system. Please check your stop spelling or search nearby stops.
            </p>
            <button
              id="try-again-btn"
              onClick={() => navigate("/search")}
              className="btn-press mt-6 px-8 py-3.5 gradient-primary text-white font-bold text-sm rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              Try Another Stops
            </button>
          </div>
        )}

        {/* Route result */}
        {result && (
          <div className="space-y-4">
            {/* Map Container */}
            <div className="fade-in-up overflow-hidden rounded-2xl border border-primary/5 shadow-xs">
              <RouteMap
                segments={result.segments}
                exchangeStops={result.exchangeStops || []}
                height="210px"
              />
            </div>

            {/* Exchange / Direct info banner */}
            {result.exchangeStops && result.exchangeStops.length > 0 ? (
              <div className="fade-in-up rounded-2xl p-4 flex items-center gap-3.5 border border-amber-500/10 bg-amber-500/5" style={{ animationDelay: "0.05s" }}>
                <div className="w-9 h-9 rounded-xl gradient-accent flex items-center justify-center shrink-0 shadow-sm text-white">
                  <svg
                    className="w-4.5 h-4.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-extrabold text-amber-900">
                    Requires {result.exchangeStops.length} exchange{result.exchangeStops.length > 1 ? "s" : ""}
                  </p>
                  <p className="text-[11px] text-amber-800/80 font-medium mt-0.5 leading-relaxed">
                    Change tamtams at{" "}
                    {result.exchangeStops.map((stop, i) => (
                      <span key={stop}>
                        <span className="font-bold text-amber-900">{stop}</span>
                        {i < result.exchangeStops.length - 1 && " & "}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ) : (
              <div className="fade-in-up rounded-2xl p-4 flex items-center gap-3.5 border border-green-500/10 bg-green-500/5" style={{ animationDelay: "0.05s" }}>
                <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shrink-0 shadow-sm text-white">
                  <svg
                    className="w-4.5 h-4.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-extrabold text-green-950">Direct Route Commute</p>
                  <p className="text-[11px] text-green-900/70 font-medium mt-0.5">No transit changes needed — sit back & enjoy!</p>
                </div>
              </div>
            )}

            {/* Segments Stack */}
            <div className="space-y-3 stagger">
              {result.segments.map((segment, idx) => (
                <div
                  key={`${segment.routeId}-${idx}`}
                  className="glass-card-solid overflow-hidden"
                >
                  {/* Segment header */}
                  <div className="flex items-center justify-between px-4 pt-4 pb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-extrabold text-xs shadow-sm"
                        style={{
                          background: `linear-gradient(135deg, ${
                            { "01": "#2D6A4F", "02": "#1B4332", "03": "#40916C" }[segment.routeId] || "#1B4332"
                          }, ${
                            { "01": "#1B4332", "02": "#0F2920", "03": "#2D6A4F" }[segment.routeId] || "#2D6A4F"
                          })`,
                        }}
                      >
                        {segment.routeId}
                      </div>
                      <div>
                        <p className="text-xs font-extrabold text-primary-dark">
                          Board {segment.routeName}
                        </p>
                        <p className="text-[10px] text-gray-400 font-medium mt-0.5 flex items-center gap-1.5">
                          <span>Segment {idx + 1} of {result.segments.length}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-300" />
                          <span>{segment.stops.length} stops</span>
                        </p>
                      </div>
                    </div>
                    <FareBadge amount={segment.fare} />
                  </div>

                  {/* Timeline container */}
                  <div className="px-4 pb-4">
                    <StopTimeline
                      stops={segment.stops}
                      exchangeStops={result.exchangeStops || []}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Search again button */}
            <button
              id="search-again-btn"
              onClick={() => navigate("/search")}
              className="fade-in-up btn-press w-full py-4 mt-2 rounded-2xl bg-white text-primary font-bold text-xs shadow-xs border border-primary/8 hover:shadow-sm hover:border-primary/15 transition-all cursor-pointer text-center"
              style={{ animationDelay: "0.2s" }}
            >
              Plan Another Commute
            </button>
          </div>
        )}
      </div>

      {/* Spacer to clear bottom navigation */}
      <div className="h-24 shrink-0" />
    </div>
  );
}
