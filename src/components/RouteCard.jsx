import { useState } from "react";
import FareBadge from "./FareBadge";

export default function RouteCard({ route, index = 0 }) {
  const [expanded, setExpanded] = useState(false);

  const firstStop = route.stops[0];
  const lastStop = route.stops[route.stops.length - 1];

  return (
    <div
      className="fade-in-up glass-card-solid overflow-hidden transition-all duration-300 hover:shadow-lg"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <button
        id={`route-card-${route.id}`}
        className="w-full text-left p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Route number badge */}
            <div
              className="flex items-center justify-center w-12 h-12 rounded-2xl text-white font-bold text-sm shrink-0 shadow-md"
              style={{
                background: `linear-gradient(135deg, ${route.color || "#1B4332"}, ${route.color ? route.color + "cc" : "#2D6A4F"})`,
              }}
            >
              {route.id}
            </div>

            <div>
              <p className="font-semibold text-primary text-[15px]">
                {route.name}
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-xs text-gray-500 font-medium">{firstStop}</span>
                <svg className="w-3 h-3 text-primary/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                <span className="text-xs text-gray-500 font-medium">{lastStop}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <FareBadge amount={route.fare} />
            <div
              className={`flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
            >
              <svg
                className="w-4 h-4 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>
      </button>

      {/* Expandable stop list */}
      <div
        className={`overflow-hidden transition-all duration-400 ease-in-out ${
          expanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4">
          <div className="divider" />
          <p className="section-label mb-3">
            {route.stops.length} Stops
          </p>
          <div className="flex flex-col gap-0 relative pl-5">
            {/* Line */}
            <div
              className="absolute left-[7px] top-2 bottom-2 w-[2px] rounded-full"
              style={{
                background: `linear-gradient(180deg, ${route.color || "#1B4332"}, ${route.color || "#1B4332"}33)`,
              }}
            />

            {route.stops.map((stop, idx) => {
              const isEndpoint = idx === 0 || idx === route.stops.length - 1;
              return (
                <div key={stop} className="flex items-center gap-3 py-1.5 relative">
                  <div
                    className={`absolute left-[-20px] top-1/2 -translate-y-1/2 rounded-full border-2 border-white ${
                      isEndpoint ? "w-4 h-4 shadow-sm" : "w-2.5 h-2.5"
                    }`}
                    style={{
                      background: isEndpoint
                        ? (route.color || "#1B4332")
                        : (route.color || "#1B4332") + "40",
                    }}
                  />
                  <span
                    className={`text-sm ${
                      isEndpoint
                        ? "font-semibold text-primary"
                        : "text-gray-500"
                    }`}
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
