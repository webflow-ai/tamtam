import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const stats = [
    { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", label: "3 Routes" },
    { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z", label: "10 Stops" },
    { icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", label: "₹10+ Fares" }
  ];

  const destinations = [
    { 
      name: "Gwalior Fort", 
      desc: "Heritage Site & Tourist Landmark", 
      route: "ROUTE 01",
      icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
      stops: "Gwalior Fort" 
    },
    { 
      name: "Maharaja Bada", 
      desc: "Central Market & Business Hub", 
      route: "ROUTE 02",
      icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
      stops: "Maharaja Bada" 
    },
    { 
      name: "Gwalior Junction", 
      desc: "Primary Transit Terminal", 
      route: "ROUTE 01",
      icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4",
      stops: "City Centre" 
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      
      {/* Header */}
      <div 
        style={{ paddingTop: "max(1rem, calc(1rem + env(safe-area-inset-top)))" }}
        className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100"
      >
        <div className="flex items-center gap-2.5">
          <button className="w-9 h-9 flex items-center justify-center text-gray-700">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-tight">TamTam Gwalior</h1>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
              <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider">Live Status</span>
            </div>
          </div>
        </div>
        <button className="w-9 h-9 flex items-center justify-center text-gray-600 bg-gray-100 rounded-full">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </button>
      </div>

      {/* Main Content - Consistent 16px horizontal padding */}
      <div className="px-4">
        
        {/* Plan Your Commute Section */}
        <div className="pt-4 pb-3">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">Plan Your Commute</h2>
          
          {/* Search Bar - Fixed: Full width, placeholder text only */}
          <button
            onClick={() => navigate("/search")}
            className="w-full bg-white rounded-xl px-4 py-3.5 shadow-sm border border-gray-200 flex items-center gap-3 mb-4 btn-press"
          >
            <svg className="w-5 h-5 text-gray-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <span className="text-gray-400 font-medium text-sm flex-1 text-left">Search destination or stop...</span>
          </button>

          {/* Stats Cards - Fixed: Equal width, green border, centered content */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-3.5 shadow-sm border-2 border-[#1B4332] flex flex-col items-center justify-center">
                <svg className="w-7 h-7 text-teal-600 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d={stat.icon}/>
                </svg>
                <p className="text-xs font-semibold text-gray-700 text-center leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Destinations - Fixed: 12px gap, dividers, updated styling */}
        <div className="py-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-900 leading-tight">Popular Destinations</h3>
            <button className="text-sm font-bold text-teal-600">View All</button>
          </div>

          <div className="space-y-3">
            {destinations.map((dest, index) => (
              <div key={index}>
                <button
                  onClick={() => navigate(`/search?destination=${encodeURIComponent(dest.stops)}`)}
                  className="w-full bg-white rounded-xl p-3.5 shadow-sm border border-gray-200 flex items-center gap-3.5 btn-press"
                >
                  {/* Fixed: Light green rounded square background */}
                  <div className="w-12 h-12 rounded-xl bg-[#D8F3DC] flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-[#1B4332]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d={dest.icon}/>
                    </svg>
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <h4 className="text-base font-bold text-gray-900 leading-tight mb-0.5">{dest.name}</h4>
                    <p className="text-xs text-gray-500 leading-tight truncate">{dest.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {/* Fixed: Dark green filled pill with white text */}
                    <span className="px-3 py-1 bg-[#1B4332] text-white text-[10px] font-bold rounded-full uppercase tracking-wide">
                      {dest.route}
                    </span>
                    {/* Fixed: Smaller grey chevron */}
                    <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </div>
                </button>
                {/* Fixed: Thin divider between items */}
                {index < destinations.length - 1 && (
                  <div className="h-px bg-gray-200 my-3" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Service Hours Card - Fixed: No FAB, full width with margin, rounded, shadow */}
        <div className="py-3 pb-28">
          <div className="bg-gradient-to-br from-[#0f3d30] to-[#1a5c48] rounded-2xl p-5 text-white shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
              <h3 className="text-base font-bold">Service Hours</h3>
            </div>
            
            <p className="text-xl font-bold mb-4">6:00 AM - 9:00 PM daily</p>
            
            {/* Fixed: Two column layout for Peak/Off-Peak */}
            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/20">
              <div>
                <p className="text-[10px] text-white/70 mb-1 uppercase tracking-wider font-bold">Peak Frequency</p>
                <p className="text-sm font-bold">Every 10-15 mins</p>
              </div>
              <div>
                <p className="text-[10px] text-white/70 mb-1 uppercase tracking-wider font-bold">Off-Peak</p>
                <p className="text-sm font-bold">Every 25 mins</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed: Bottom Navigation Bar - 64px height with safe area */}
      <div 
        style={{ paddingBottom: "max(0rem, env(safe-area-inset-bottom))" }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50"
      >
        <div className="grid grid-cols-4 h-16">
          <button className="flex flex-col items-center justify-center gap-1 text-[#1B4332]">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            </svg>
            <span className="text-[10px] font-bold">Home</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1 text-gray-400">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <span className="text-[10px] font-bold">Search</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1 text-gray-400">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
            </svg>
            <span className="text-[10px] font-bold">Routes</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1 text-gray-400">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span className="text-[10px] font-bold">Stops</span>
          </button>
        </div>
      </div>
    </div>
  );
}
