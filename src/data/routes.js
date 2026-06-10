/**
 * Stop coordinates for Gwalior city (approximate real locations).
 */
export const stopCoordinates = {
  "City Centre": [26.2183, 78.1828],
  "Phoolbagh": [26.2124, 78.1765],
  "Hazira": [26.2063, 78.1710],
  "Maharaja Bada": [26.2040, 78.1690],
  "Lashkar": [26.2183, 78.1700],
  "Gole Ka Mandir": [26.2268, 78.1770],
  "Thatipur": [26.2340, 78.1870],
  "MLB College": [26.2130, 78.1660],
  "Kampu": [26.2060, 78.1580],
  "Gwalior Fort": [26.2310, 78.1696],
};

export const tamtamRoutes = [
  {
    id: "01",
    name: "Tamtam 01",
    color: "#2D6A4F",
    stops: ["City Centre", "Phoolbagh", "Hazira", "Maharaja Bada"],
    fare: 10,
  },
  {
    id: "02",
    name: "Tamtam 02",
    color: "#1B4332",
    stops: ["Maharaja Bada", "Lashkar", "Gole Ka Mandir", "Thatipur"],
    fare: 15,
  },
  {
    id: "03",
    name: "Tamtam 03",
    color: "#40916C",
    stops: ["Thatipur", "MLB College", "Kampu", "Gwalior Fort"],
    fare: 10,
  },
];

/**
 * Get all unique stops across all routes.
 */
export function getAllStops() {
  const stopSet = new Set();
  tamtamRoutes.forEach((route) => {
    route.stops.forEach((stop) => stopSet.add(stop));
  });
  return Array.from(stopSet);
}

/**
 * Get coordinates for a stop name.
 */
export function getStopCoords(stopName) {
  return stopCoordinates[stopName] || null;
}
