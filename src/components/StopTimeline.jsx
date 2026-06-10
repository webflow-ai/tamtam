export default function StopTimeline({ stops, exchangeStops = [] }) {
  const isExchangeStop = (stop) =>
    exchangeStops.some((ex) => ex.toLowerCase() === stop.toLowerCase());

  return (
    <div className="flex flex-col relative pl-7 py-2">
      {/* Vertical line */}
      <div
        className="absolute left-[12px] top-6 bottom-6 w-[2.5px] rounded-full"
        style={{
          background: "linear-gradient(180deg, #2D6A4F 0%, #95D5B2 100%)",
        }}
        aria-hidden="true"
      />

      {stops.map((stop, idx) => {
        const isExchange = isExchangeStop(stop);
        const isFirst = idx === 0;
        const isLast = idx === stops.length - 1;
        const isEndpoint = isFirst || isLast;

        return (
          <div
            key={`${stop}-${idx}`}
            className="relative flex items-center gap-3 py-2.5"
          >
            {/* Dot */}
            <div
              className={`absolute -left-7 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all duration-300
                ${
                  isExchange
                    ? "w-6 h-6 bg-accent border-[2.5px] border-white shadow-[0_0_14px_rgba(245,158,11,0.4)]"
                    : isEndpoint
                    ? "w-5 h-5 border-[2.5px] border-white shadow-md"
                    : "w-3 h-3 bg-white border-2 border-primary-soft/60"
                }`}
              style={
                isEndpoint && !isExchange
                  ? { background: "linear-gradient(135deg, #1B4332, #2D6A4F)" }
                  : undefined
              }
            >
              {isExchange && (
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="white"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              )}
            </div>

            {/* Stop name and label */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span
                className={`text-sm transition-all duration-200 truncate
                  ${
                    isExchange
                      ? "font-bold text-accent"
                      : isEndpoint
                      ? "font-semibold text-primary"
                      : "font-normal text-gray-500"
                  }`}
              >
                {stop}
              </span>

              {isExchange && (
                <span className="shrink-0 text-[10px] bg-accent/15 text-accent font-bold px-2 py-0.5 rounded-full">
                  Exchange
                </span>
              )}
              {isFirst && !isExchange && (
                <span className="shrink-0 text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">
                  Start
                </span>
              )}
              {isLast && !isExchange && (
                <span className="shrink-0 text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">
                  End
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
