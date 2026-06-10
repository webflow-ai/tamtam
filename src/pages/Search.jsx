import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import TopBar from "../components/TopBar";
import RouteMap from "../components/RouteMap";
import { getAllStops, tamtamRoutes } from "../data/routes";

const allStops = getAllStops();

// Recent searches stored in localStorage
function getRecentSearches() {
  try {
    return JSON.parse(localStorage.getItem("tamtam_recent") || "[]");
  } catch {
    return [];
  }
}

function saveRecentSearch(source, destination) {
  const recent = getRecentSearches();
  const entry = { source, destination, timestamp: Date.now() };
  const filtered = recent.filter(
    (r) =>
      !(
        r.source.toLowerCase() === source.toLowerCase() &&
        r.destination.toLowerCase() === destination.toLowerCase()
      )
  );
  filtered.unshift(entry);
  localStorage.setItem(
    "tamtam_recent",
    JSON.stringify(filtered.slice(0, 5))
  );
}

/**
 * Autocomplete Input integrated into unified planner container.
 */
function AutocompleteInput({ id, placeholder, value, onChange, isSource = false }) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const ref = useRef(null);

  const filtered = value.trim()
    ? allStops.filter(
        (s) =>
          s.toLowerCase().includes(value.toLowerCase()) &&
          s.toLowerCase() !== value.toLowerCase()
      )
    : [];

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const highlightMatch = (text, query) => {
    if (!query.trim()) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span className="font-extrabold text-primary">{text.slice(idx, idx + query.length)}</span>
        {text.slice(idx + query.length)}
      </>
    );
  };

  return (
    <div ref={ref} className="relative flex-1">
      <div className="flex items-center">
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            setFocused(true);
            if (value.trim()) setOpen(true);
          }}
          placeholder={placeholder}
          className="w-full py-3 pr-8 bg-transparent text-sm font-semibold text-primary-dark placeholder:text-gray-400"
          autoComplete="off"
        />
        {value && (
          <button
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className="absolute right-2 text-gray-400 hover:text-gray-500 cursor-pointer"
            aria-label="Clear"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {open && filtered.length > 0 && (
        <div className="autocomplete-dropdown">
          {filtered.map((stop) => (
            <div
              key={stop}
              className="autocomplete-item"
              onMouseDown={() => {
                onChange(stop);
                setOpen(false);
              }}
            >
              <span className="flex items-center gap-2.5">
                <svg
                  className="w-4 h-4 text-primary/30 shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
                </svg>
                <span className="font-medium">{highlightMatch(stop, value)}</span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Search() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Initialize from search query parameters if available
  const [source, setSource] = useState(searchParams.get("source") || "");
  const [destination, setDestination] = useState(searchParams.get("destination") || "");
  const [recentSearches] = useState(getRecentSearches);

  const canSearch = source.trim() && destination.trim();

  const handleFindRoute = () => {
    if (canSearch) {
      saveRecentSearch(source.trim(), destination.trim());
      navigate(
        `/route?source=${encodeURIComponent(source.trim())}&destination=${encodeURIComponent(destination.trim())}`
      );
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <TopBar
        title="Plan Commute"
        rightIcon={
          <button
            id="view-routes-btn"
            onClick={() => navigate("/routes")}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/5 hover:bg-primary/10 text-primary transition-colors cursor-pointer"
            aria-label="View all routes"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
            </svg>
          </button>
        }
      />

      <div className="page-enter flex-1 px-4 pt-4">
        {/* Nearest Stop Live Status Card */}
        <div className="fade-in-up glass-card p-3.5 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/6 text-primary shadow-xs">
                <svg className="w-5 h-5 text-primary-soft" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
                </svg>
              </div>
              <div>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Nearest Commute Hub</p>
                <p className="text-sm font-extrabold text-primary-dark mt-0.5">Phoolbagh</p>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/10">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] font-bold text-green-700">~200m (3m walk)</span>
              </span>
            </div>
          </div>
        </div>

        {/* Network Map Preview Container */}
        <div className="fade-in-up mb-4" style={{ animationDelay: "0.05s" }}>
          <div className="overflow-hidden rounded-2xl border border-primary/5 shadow-xs">
            <RouteMap
              showAllRoutes
              allRoutes={tamtamRoutes}
              height="150px"
            />
          </div>
        </div>

        {/* Unified Commute Planner Input Box */}
        <div className="fade-in-up relative bg-white border border-primary/6 rounded-3xl p-4 shadow-sm mb-4" style={{ animationDelay: "0.1s" }}>
          {/* Vertical Path timeline graphic */}
          <div className="absolute left-[26px] top-[52px] bottom-[38px] w-[2px] bg-dashed border-l-2 border-dashed border-primary/15 flex flex-col justify-between" />
          
          {/* Source node */}
          <div className="absolute left-[22px] top-[50px] w-[10px] h-[10px] rounded-full border-[2.5px] border-primary bg-white z-10" />
          
          {/* Destination node */}
          <div className="absolute left-[21.5px] bottom-[38px] w-[11px] h-[11px] rounded-full bg-accent border-[2.5px] border-white shadow-xs z-10" />

          {/* Swap Button Absolute Positioning */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
            <button
              id="swap-stops-btn"
              onClick={() => {
                setSource(destination);
                setDestination(source);
              }}
              className="btn-press w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-100 hover:shadow-lg transition-all cursor-pointer text-primary"
              aria-label="Swap source and destination"
            >
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
            </button>
          </div>

          {/* Form Fields Stack */}
          <div className="space-y-1 pl-8 pr-12">
            {/* Source block */}
            <div className="flex flex-col">
              <label htmlFor="source-input" className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Start point</label>
              <AutocompleteInput
                id="source-input"
                placeholder="Enter starting stop..."
                value={source}
                onChange={setSource}
                isSource={true}
              />
            </div>

            {/* Separator line inside card */}
            <div className="border-t border-gray-100 my-1" />

            {/* Destination block */}
            <div className="flex flex-col">
              <label htmlFor="destination-input" className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Destination</label>
              <AutocompleteInput
                id="destination-input"
                placeholder="Enter destination stop..."
                value={destination}
                onChange={setDestination}
                isSource={false}
              />
            </div>
          </div>
        </div>

        {/* Find Route Action Button */}
        <button
          id="find-route-btn"
          onClick={handleFindRoute}
          disabled={!canSearch}
          className={`fade-in-up btn-press w-full py-4 rounded-2xl font-bold text-sm transition-all duration-300 cursor-pointer ${
            canSearch
              ? "gradient-primary text-white shadow-md hover:shadow-lg shimmer-overlay"
              : "bg-gray-100 text-gray-300 cursor-not-allowed shadow-none"
          }`}
          style={{ animationDelay: "0.15s" }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            Find Transit Routes
          </span>
        </button>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div className="fade-in-up mt-6 animate-pageSlideIn" style={{ animationDelay: "0.2s" }}>
            <h3 className="section-label mb-3">Recent Searches</h3>
            <div className="space-y-2.5">
              {recentSearches.slice(0, 3).map((search, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSource(search.source);
                    setDestination(search.destination);
                  }}
                  className="btn-press w-full flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-primary/4 hover:bg-primary/4 hover:border-primary/8 transition-all cursor-pointer text-left shadow-xs"
                >
                  <div className="w-8 h-8 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-primary-soft" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-primary-dark truncate flex items-center gap-1.5">
                      <span>{search.source}</span>
                      <span className="text-primary-soft/40 font-normal">→</span>
                      <span>{search.destination}</span>
                    </p>
                  </div>
                  <svg className="w-4 h-4 text-gray-300 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Popular Commutes */}
        <div className="fade-in-up mt-6 pb-6" style={{ animationDelay: "0.25s" }}>
          <h3 className="section-label mb-3">Suggested Quick Commutes</h3>
          <div className="flex flex-wrap gap-2">
            {[
              ["City Centre", "Maharaja Bada"],
              ["Phoolbagh", "Thatipur"],
              ["Kampu", "Gwalior Fort"],
              ["Lashkar", "MLB College"],
            ].map(([from, to]) => (
              <button
                key={`${from}-${to}`}
                onClick={() => {
                  setSource(from);
                  setDestination(to);
                }}
                className="btn-press chip bg-white border border-primary/6 text-primary-soft hover:bg-primary/5 hover:border-primary/12 cursor-pointer shadow-xs text-xs font-bold"
              >
                <svg className="w-3.5 h-3.5 text-primary/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                {from} to {to}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Spacer to clear bottom navigation */}
      <div className="h-24 shrink-0" />
    </div>
  );
}
