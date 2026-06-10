/**
 * findRoute(source, destination, routes)
 *
 * BFS-style route finder supporting up to 2 exchanges (3 segments):
 * 1. If source and destination are on the same tamtam → single segment.
 * 2. If one exchange connects them → two segments.
 * 3. If two exchanges are needed → three segments.
 * 4. Returns null if no route found.
 *
 * Returns: {
 *   segments: [{ routeId, routeName, stops, fare }],
 *   exchangeStop: string | null,       // for single exchange
 *   exchangeStops: string[],           // for multiple exchanges
 *   totalFare: number
 * }
 */
export function findRoute(source, destination, routes) {
  const matchStop = (stop, target) =>
    stop.toLowerCase() === target.toLowerCase();

  const findStopIndex = (route, stopName) =>
    route.stops.findIndex((s) => matchStop(s, stopName));

  const buildSegment = (route, fromIdx, toIdx) => {
    const start = Math.min(fromIdx, toIdx);
    const end = Math.max(fromIdx, toIdx);
    const stops = route.stops.slice(start, end + 1);
    if (fromIdx > toIdx) stops.reverse();
    return {
      routeId: route.id,
      routeName: route.name,
      stops,
      fare: route.fare,
    };
  };

  // --- 1. Direct route (same tamtam) ---
  for (const route of routes) {
    const srcIdx = findStopIndex(route, source);
    const dstIdx = findStopIndex(route, destination);
    if (srcIdx !== -1 && dstIdx !== -1) {
      return {
        segments: [buildSegment(route, srcIdx, dstIdx)],
        exchangeStop: null,
        exchangeStops: [],
        totalFare: route.fare,
      };
    }
  }

  // --- 2. One exchange (two tamtams) ---
  for (let i = 0; i < routes.length; i++) {
    const routeA = routes[i];
    const srcIdx = findStopIndex(routeA, source);
    if (srcIdx === -1) continue;

    for (let j = 0; j < routes.length; j++) {
      if (i === j) continue;
      const routeB = routes[j];
      const dstIdx = findStopIndex(routeB, destination);
      if (dstIdx === -1) continue;

      // Find common exchange stop
      for (const stopA of routeA.stops) {
        const exIdxB = findStopIndex(routeB, stopA);
        if (exIdxB !== -1) {
          const exIdxA = routeA.stops.indexOf(stopA);
          return {
            segments: [
              buildSegment(routeA, srcIdx, exIdxA),
              buildSegment(routeB, exIdxB, dstIdx),
            ],
            exchangeStop: stopA,
            exchangeStops: [stopA],
            totalFare: routeA.fare + routeB.fare,
          };
        }
      }
    }
  }

  // --- 3. Two exchanges (three tamtams) ---
  for (let i = 0; i < routes.length; i++) {
    const routeA = routes[i];
    const srcIdx = findStopIndex(routeA, source);
    if (srcIdx === -1) continue;

    for (let j = 0; j < routes.length; j++) {
      if (j === i) continue;
      const routeB = routes[j];

      // Find exchange 1: routeA ↔ routeB
      for (const stopAB of routeA.stops) {
        const abIdxB = findStopIndex(routeB, stopAB);
        if (abIdxB === -1) continue;
        const abIdxA = routeA.stops.indexOf(stopAB);

        for (let k = 0; k < routes.length; k++) {
          if (k === i || k === j) continue;
          const routeC = routes[k];
          const dstIdx = findStopIndex(routeC, destination);
          if (dstIdx === -1) continue;

          // Find exchange 2: routeB ↔ routeC
          for (const stopBC of routeB.stops) {
            const bcIdxC = findStopIndex(routeC, stopBC);
            if (bcIdxC !== -1) {
              const bcIdxB = routeB.stops.indexOf(stopBC);
              return {
                segments: [
                  buildSegment(routeA, srcIdx, abIdxA),
                  buildSegment(routeB, abIdxB, bcIdxB),
                  buildSegment(routeC, bcIdxC, dstIdx),
                ],
                exchangeStop: stopAB, // primary exchange for backward compat
                exchangeStops: [stopAB, stopBC],
                totalFare: routeA.fare + routeB.fare + routeC.fare,
              };
            }
          }
        }
      }
    }
  }

  // 4. No route found
  return null;
}
