import {
  AlertTriangle,
  BarChart3,
  Bot,
  Database,
  FileText,
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

          <p className="nav-label">
            MAIN
          </p>

          <button
            className={`nav-item ${
              currentPage === "dashboard"
                ? "active"
                : ""
            }`}
            onClick={() => navigate("dashboard")}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>

          <button
            className={`nav-item ${
              currentPage === "live-map"
                ? "active"
                : ""
            }`}
            onClick={() => navigate("live-map")}
          >
            <Map size={18} />
            <span>Live Map</span>
          </button>

          <button
            className={`nav-item ${
              currentPage === "incidents"
                ? "active"
                : ""
            }`}
            onClick={() => navigate("incidents")}
          >
            <AlertTriangle size={18} />
            <span>Incidents</span>

            <em>12</em>
          </button>

          <button className="nav-item">
            <AlertTriangle size={18} />
            <span>Alerts</span>

            <em className="danger-count">
              3
            </em>
          </button>

          <button className="nav-item">
            <BarChart3 size={18} />
            <span>Analytics</span>
          </button>
<button
  className={`nav-item ${
    currentPage === "ai-prediction" ? "active" : ""
  }`}
  onClick={() => navigate("ai-prediction")}
>
  <Brain size={19} />
  <span>AI Prediction</span>
</button>
          <button className="nav-item">
            <Bot size={18} />
            <span>AI Models</span>
          </button>

          <p className="nav-label nav-label-spaced">
            OPERATIONS
          </p>

          <button className="nav-item">
            <House size={18} />
            <span>Shelters</span>
          </button>

          <button className="nav-item">
            <Users size={18} />
            <span>Response Teams</span>
          </button>

          <button className="nav-item">
            <Truck size={18} />
            <span>Logistics</span>
          </button>

          <button className="nav-item">
            <FileText size={18} />
            <span>Reports</span>
          </button>

          <button className="nav-item">
            <Database size={18} />
            <span>Data</span>
          </button>

          <p className="nav-label nav-label-spaced">
            SYSTEM
          </p>

          <button className="nav-item">
            <ShieldCheck size={18} />
            <span>Security</span>
          </button>

          <button className="nav-item">
            <Settings size={18} />
            <span>Settings</span>
          </button>

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