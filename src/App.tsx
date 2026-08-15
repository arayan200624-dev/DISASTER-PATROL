import { useEffect, useState } from "react";
import { Siren } from "lucide-react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import Incidents from "./pages/Incidents";
import LiveMap from "./pages/LiveMap";
import AIPrediction from "./pages/AIPrediction";
import Alerts from "./pages/Alerts";
import Analytics from "./pages/Analytics";
import Shelters from "./pages/Shelters";
import ResponseTeams from "./pages/ResponseTeams";

import "leaflet/dist/leaflet.css";
import "./App.css";

/* =========================================================
   BOOT SEQUENCE
   ========================================================= */

function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const first = setTimeout(() => setPhase(1), 400);
    const second = setTimeout(() => setPhase(2), 900);
    const finish = setTimeout(() => onComplete(), 2000);

    return () => {
      clearTimeout(first);
      clearTimeout(second);
      clearTimeout(finish);
    };
  }, [onComplete]);

  return (
    <div className={`boot-screen boot-phase-${phase}`}>
      <div className="boot-background" />
      <div className="boot-center">
        <div className="boot-logo-container">
          <div className="boot-siren">
            <Siren size={60} strokeWidth={1.5} />
          </div>
          <div className="boot-title">
            <span>DISASTER</span>
            <strong>PATROL</strong>
          </div>
          <div className="boot-subtitle">
            Emergency Response System
          </div>
        </div>

        <div className="boot-loading">
          <div className="boot-loading-bar">
            <div className="boot-loading-progress" />
          </div>
          <span>
            {phase === 0 && "Initializing..."}
            {phase === 1 && "Loading systems..."}
            {phase >= 2 && "Ready"}
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   APP
   ========================================================= */

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [booting, setBooting] = useState(true);

  const pageMap: { [key: string]: React.ReactNode } = {
    dashboard: <Dashboard />,
    "live-map": <LiveMap />,
    incidents: <Incidents />,
    alerts: <Alerts />,
    analytics: <Analytics />,
    "ai-prediction": <AIPrediction />,
    shelters: <Shelters />,
    "response-teams": <ResponseTeams />,
  };

  return (
    <>
      {booting && <BootSequence onComplete={() => setBooting(false)} />}

      <div className={`app-shell ${sidebarOpen ? "sidebar-open" : ""}`}>
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onNavigate={setCurrentPage}
          currentPage={currentPage}
        />

        <div className="main-area">
          <Header onMenuClick={() => setSidebarOpen((prev) => !prev)} />

          <main className="dashboard-content">
            {pageMap[currentPage] || (
              <div className="coming-soon">
                <Siren size={30} />
                <p>DISASTER PATROL</p>
                <h2>Module coming online</h2>
                <span>This command module is being configured.</span>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

export default App;