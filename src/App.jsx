import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import RouteResult from "./pages/RouteResult";
import AllRoutes from "./pages/AllRoutes";
import SideNav from "./components/SideNav";
import BottomNav from "./components/BottomNav";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        {/* Sidebar: visible on desktop only (CSS hides on mobile) */}
        <SideNav />

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/route" element={<RouteResult />} />
            <Route path="/routes" element={<AllRoutes />} />
          </Routes>
        </div>

        {/* Bottom nav: visible on mobile only (CSS hides on desktop) */}
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;
