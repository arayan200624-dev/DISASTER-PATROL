import {
  AlertTriangle,
  BarChart3,
  House,
  LayoutDashboard,
  Map,
  Settings,
  ShieldCheck,
  Truck,
  Brain,
  Users,
  X,
} from "lucide-react";

import "./Sidebar.css";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
};

export default function Sidebar({
  open,
  onClose,
  onNavigate,
  currentPage,
}: SidebarProps) {
  const navigate = (page: string) => {
    onNavigate(page);
    onClose();
  };

  return (
    <>
      {open && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
        />
      )}

      <aside
        className={`sidebar ${
          open ? "sidebar-open" : ""
        }`}
      >

        <div className="sidebar-brand">

          <div className="disaster-logo">
            <ShieldCheck size={25} />
          </div>

          <div className="brand-text">
            <strong>
              DISASTER
            </strong>

            <strong className="brand-red">
              PATROL
            </strong>

            <span>
              COMMAND CENTER
            </span>
          </div>

          <button
            className="mobile-close"
            onClick={onClose}
          >
            <X size={20} />
          </button>

        </div>

        <div className="sidebar-live">
          <i />
          <span>National Operations</span>
          <strong>LIVE</strong>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-group">
            <p className="nav-label">MAIN</p>

            <button
              className={`nav-link ${currentPage === "dashboard" ? "active" : ""}`}
              onClick={() => navigate("dashboard")}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </button>

            <button
              className={`nav-link ${currentPage === "live-map" ? "active" : ""}`}
              onClick={() => navigate("live-map")}
            >
              <Map size={18} />
              <span>Live Map</span>
            </button>

            <button
              className={`nav-link ${currentPage === "incidents" ? "active" : ""}`}
              onClick={() => navigate("incidents")}
            >
              <AlertTriangle size={18} />
              <span>Incidents</span>
            </button>

            <button
              className={`nav-link ${currentPage === "alerts" ? "active" : ""}`}
              onClick={() => navigate("alerts")}
            >
              <AlertTriangle size={18} />
              <span>Alerts</span>
            </button>

            <button
              className={`nav-link ${currentPage === "analytics" ? "active" : ""}`}
              onClick={() => navigate("analytics")}
            >
              <BarChart3 size={18} />
              <span>Analytics</span>
            </button>

            <button
              className={`nav-link ${currentPage === "ai-prediction" ? "active" : ""}`}
              onClick={() => navigate("ai-prediction")}
            >
              <Brain size={18} />
              <span>AI Prediction</span>
            </button>
          </div>

          <div className="nav-group">
            <p className="nav-label">OPERATIONS</p>

            <button
              className={`nav-link ${currentPage === "shelters" ? "active" : ""}`}
              onClick={() => navigate("shelters")}
            >
              <House size={18} />
              <span>Shelters</span>
            </button>

            <button
              className={`nav-link ${currentPage === "response-teams" ? "active" : ""}`}
              onClick={() => navigate("response-teams")}
            >
              <Users size={18} />
              <span>Response Teams</span>
            </button>

            <button className="nav-link">
              <Truck size={18} />
              <span>Logistics</span>
            </button>
          </div>

          <div className="nav-group">
            <p className="nav-label">SYSTEM</p>

            <button className="nav-link">
              <Settings size={18} />
              <span>Settings</span>
            </button>
          </div>

        </nav>

        <div className="sidebar-hotline">

          <div className="hotline-icon">
            <span>112</span>
          </div>

          <div>
            <span>EMERGENCY HOTLINE</span>
            <strong>112</strong>
            <small>24/7 RESPONSE</small>
          </div>

        </div>

      </aside>
    </>
  );
}