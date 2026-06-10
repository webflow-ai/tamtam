import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getStopCoords } from "../data/routes";

// Fix default marker icons in webpack/vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

/**
 * Create a circular stop marker icon.
 */
function createStopIcon(color = "#1B4332", isExchange = false, isEndpoint = false) {
  const size = isExchange ? 32 : isEndpoint ? 26 : 20;
  const borderWidth = isExchange ? 3 : 2;

  return L.divIcon({
    className: "custom-div-icon",
    html: `<div style="
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${isExchange ? "#F59E0B" : color};
      border: ${borderWidth}px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3)${isExchange ? ", 0 0 16px rgba(245,158,11,0.4)" : ""};
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      ${isExchange ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2"><path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/></svg>' : ""}
      ${isEndpoint && !isExchange ? '<div style="width:6px;height:6px;border-radius:50%;background:white;"></div>' : ""}
    </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2 - 4],
  });
}

/**
 * Auto-fit the map bounds to markers.
 */
function FitBounds({ coords }) {
  const map = useMap();
  const fitted = useRef(false);

  useEffect(() => {
    if (coords.length > 0 && !fitted.current) {
      const bounds = L.latLngBounds(coords);
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
      fitted.current = true;
    }
  }, [coords, map]);

  return null;
}

/**
 * RouteMap — Displays route segments on a Leaflet map.
 *
 * Props:
 *   segments: Array of { routeId, routeName, stops, fare }
 *   exchangeStops: Array of exchange stop names
 *   height: CSS height string (default "240px")
 *   showAllRoutes: boolean — if true, shows all routes overview
 *   allRoutes: Array of route objects for overview mode
 */
export default function RouteMap({
  segments = [],
  exchangeStops = [],
  height = "240px",
  showAllRoutes = false,
  allRoutes = [],
}) {
  // Collect all coordinates
  const allCoords = [];

  // Route colors for multi-route display
  const routeColors = {
    "01": "#2D6A4F",
    "02": "#1B4332",
    "03": "#40916C",
  };

  if (showAllRoutes && allRoutes.length > 0) {
    // Overview mode: show all routes
    allRoutes.forEach((route) => {
      route.stops.forEach((stop) => {
        const coords = getStopCoords(stop);
        if (coords) allCoords.push(coords);
      });
    });

    const center = allCoords.length > 0
      ? [
          allCoords.reduce((s, c) => s + c[0], 0) / allCoords.length,
          allCoords.reduce((s, c) => s + c[1], 0) / allCoords.length,
        ]
      : [26.22, 78.17];

    return (
      <div className="rounded-2xl overflow-hidden shadow-lg border border-white/40" style={{ height }}>
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <FitBounds coords={allCoords} />

          {allRoutes.map((route) => {
            const routeCoords = route.stops
              .map((s) => getStopCoords(s))
              .filter(Boolean);

            return (
              <div key={route.id}>
                {/* Route line */}
                <Polyline
                  positions={routeCoords}
                  pathOptions={{
                    color: route.color || routeColors[route.id] || "#1B4332",
                    weight: 4,
                    opacity: 0.8,
                    dashArray: null,
                  }}
                />

                {/* Stop markers */}
                {route.stops.map((stop, idx) => {
                  const coords = getStopCoords(stop);
                  if (!coords) return null;
                  const isEndpoint = idx === 0 || idx === route.stops.length - 1;

                  return (
                    <Marker
                      key={`${route.id}-${stop}`}
                      position={coords}
                      icon={createStopIcon(
                        route.color || routeColors[route.id],
                        false,
                        isEndpoint
                      )}
                    >
                      <Popup>
                        <div style={{ fontFamily: "Poppins, sans-serif" }}>
                          <strong style={{ color: "#1B4332" }}>{stop}</strong>
                          <br />
                          <span style={{ fontSize: "11px", color: "#6B7280" }}>
                            {route.name}
                          </span>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </div>
            );
          })}
        </MapContainer>
      </div>
    );
  }

  // Segment mode: show specific route segments
  const segmentLines = [];

  segments.forEach((segment) => {
    const coords = segment.stops
      .map((s) => getStopCoords(s))
      .filter(Boolean);
    segmentLines.push({
      coords,
      color: routeColors[segment.routeId] || "#1B4332",
      routeId: segment.routeId,
    });
    coords.forEach((c) => allCoords.push(c));
  });

  if (allCoords.length === 0) return null;

  const center = [
    allCoords.reduce((s, c) => s + c[0], 0) / allCoords.length,
    allCoords.reduce((s, c) => s + c[1], 0) / allCoords.length,
  ];

  // Collect unique stops with metadata
  const stopMap = new Map();
  segments.forEach((segment) => {
    segment.stops.forEach((stop, idx) => {
      if (!stopMap.has(stop)) {
        stopMap.set(stop, {
          name: stop,
          coords: getStopCoords(stop),
          isExchange: exchangeStops.some(
            (ex) => ex.toLowerCase() === stop.toLowerCase()
          ),
          isEndpoint: false,
          routeName: segment.routeName,
        });
      }
    });
  });

  // Mark first and last stops as endpoints
  if (segments.length > 0) {
    const firstStop = segments[0].stops[0];
    const lastStop = segments[segments.length - 1].stops[segments[segments.length - 1].stops.length - 1];
    if (stopMap.has(firstStop)) stopMap.get(firstStop).isEndpoint = true;
    if (stopMap.has(lastStop)) stopMap.get(lastStop).isEndpoint = true;
  }

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg border border-white/40" style={{ height }}>
      <MapContainer
        center={center}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <FitBounds coords={allCoords} />

        {/* Route polylines */}
        {segmentLines.map((line, idx) => (
          <Polyline
            key={idx}
            positions={line.coords}
            pathOptions={{
              color: line.color,
              weight: 5,
              opacity: 0.85,
              lineCap: "round",
              lineJoin: "round",
            }}
          />
        ))}

        {/* Stop markers */}
        {Array.from(stopMap.values()).map((stop) => {
          if (!stop.coords) return null;
          return (
            <Marker
              key={stop.name}
              position={stop.coords}
              icon={createStopIcon("#1B4332", stop.isExchange, stop.isEndpoint)}
            >
              <Popup>
                <div style={{ fontFamily: "Poppins, sans-serif" }}>
                  <strong style={{ color: stop.isExchange ? "#F59E0B" : "#1B4332" }}>
                    {stop.name}
                  </strong>
                  {stop.isExchange && (
                    <span
                      style={{
                        display: "inline-block",
                        marginLeft: 6,
                        padding: "1px 8px",
                        borderRadius: 99,
                        background: "#FEF3C7",
                        color: "#D97706",
                        fontSize: 10,
                        fontWeight: 700,
                      }}
                    >
                      Exchange
                    </span>
                  )}
                  <br />
                  <span style={{ fontSize: "11px", color: "#6B7280" }}>
                    {stop.routeName}
                  </span>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
