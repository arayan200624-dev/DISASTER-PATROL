import { useEffect, useState } from "react";
import {
  AlertTriangle,
  MapPin,
  ShieldAlert,
  Radio,
  Users,
  Activity,
  Siren,
  Crosshair,
  Wifi,
} from "lucide-react";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import UsageChart from "./components/UsageChart";
import ModelHealth from "./components/ModelHealth";
import ActivityFeed from "./components/ActivityFeed";

import Incidents from "./pages/Incidents";
import LiveMap from "./pages/LiveMap";
import AIPrediction from "./pages/AIPrediction";

import "leaflet/dist/leaflet.css";
import "./App.css";

const mapLocations = [
  {
    name: "Lucknow",
    type: "Critical Flood",
    coordinates: [26.8467, 80.9462] as [number, number],
    className: "critical",
  },
  {
    name: "Kanpur",
    type: "Severe Storm",
    coordinates: [26.4499, 80.3319] as [number, number],
    className: "high",
  },
  {
    name: "Nainital",
    type: "Forest Fire",
    coordinates: [29.3919, 79.4542] as [number, number],
    className: "high",
  },
  {
    name: "Dehradun",
    type: "Earthquake Activity",
    coordinates: [30.3165, 78.0322] as [number, number],
    className: "medium",
  },
  {
    name: "Delhi",
    type: "Monitoring Zone",
    coordinates: [28.6139, 77.209] as [number, number],
    className: "medium",
  },
];

/* =========================================================
   BOOT SEQUENCE
   ========================================================= */

function BootSequence({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const first = setTimeout(() => setPhase(1), 700);
    const second = setTimeout(() => setPhase(2), 1600);
    const third = setTimeout(() => setPhase(3), 2600);
    const finish = setTimeout(() => onComplete(), 3900);

    return () => {
      clearTimeout(first);
      clearTimeout(second);
      clearTimeout(third);
      clearTimeout(finish);
    };
  }, [onComplete]);

  return (
    <div className={`boot-screen boot-phase-${phase}`}>
      <div className="boot-noise" />
      <div className="boot-grid" />

      <div className="boot-frame">
        <div className="boot-frame-corner top-left" />
        <div className="boot-frame-corner top-right" />
        <div className="boot-frame-corner bottom-left" />
        <div className="boot-frame-corner bottom-right" />
      </div>

      <div className="boot-meta boot-meta-left">
        <span>DP / OPS-01</span>
        <span>COMMAND NETWORK</span>
      </div>

      <div className="boot-meta boot-meta-right">
        <span>EMERGENCY SYSTEM</span>
        <span>SECURE CHANNEL</span>
      </div>

      <div className="boot-center">
        <div className="siren-unit">
          <div className="siren-base">
            <div className="siren-ring">
              <Siren size={70} strokeWidth={1.3} />
            </div>
          </div>

          <div className="siren-beacon" />
        </div>

        <div className="boot-status">
          <span className="status-light" />

          <span>
            {phase === 0 && "INITIALIZING EMERGENCY NETWORK"}
            {phase === 1 && "ESTABLISHING COMMAND LINK"}
            {phase >= 2 && "COMMAND NETWORK ONLINE"}
          </span>
        </div>

        <div className="boot-title">
          <div>DISASTER</div>
          <strong>PATROL</strong>
        </div>

        <div className="boot-subtitle">
          NATIONAL DISASTER RESPONSE COMMAND
        </div>

        <div className="boot-progress">
          <span />
        </div>

        <div className="boot-system-row">
          <span>
            <Wifi size={11} />
            NETWORK
          </span>

          <span>
            <Crosshair size={11} />
            TRACKING
          </span>

          <span>
            <ShieldAlert size={11} />
            RESPONSE
          </span>
        </div>
      </div>

      <div className="boot-footer">
        <span>AUTHORIZED PERSONNEL ONLY</span>
        <span>DP // 2026</span>
      </div>
    </div>
  );
}

/* =========================================================
   MAP
   ========================================================= */

function DashboardMap() {
  return (
    <div className="dashboard-map-background">
      <MapContainer
        center={[22.5, 80]}
        zoom={5}
        minZoom={4}
        maxZoom={8}
        scrollWheelZoom={false}
        zoomControl={false}
        attributionControl={true}
        className="dashboard-leaflet-map"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          opacity={0.38}
        />

        {mapLocations.map((location) => (
          <CircleMarker
            key={location.name}
            center={location.coordinates}
            radius={6}
            pathOptions={{
              color:
                location.className === "critical"
                  ? "#c63d35"
                  : location.className === "high"
                    ? "#c59b3b"
                    : "#78909c",

              fillColor:
                location.className === "critical"
                  ? "#c63d35"
                  : location.className === "high"
                    ? "#c59b3b"
                    : "#78909c",

              fillOpacity: 0.9,
              weight: 2,
            }}
          >
            <Popup>
              <strong>{location.name}</strong>
              <br />
              {location.type}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      <div className="map-dark-overlay" />
      <div className="map-grid-overlay" />

      <div className="map-region-label india-label">
        INDIA
      </div>

      <div className="map-region-label pakistan-label">
        PAKISTAN
      </div>

      <div className="map-region-label nepal-label">
        NEPAL
      </div>

      <div className="map-region-label bangladesh-label">
        BANGLADESH
      </div>
    </div>
  );
}

/* =========================================================
   DASHBOARD
   ========================================================= */

function Dashboard() {
  const generateReport = () => {
    const reportWindow = window.open("", "_blank");

    if (!reportWindow) {
      alert("Please allow pop-ups to generate the report.");
      return;
    }

    const reportDate = new Date().toLocaleString();

    reportWindow.document.write(`
      <!DOCTYPE html>

      <html>
        <head>
          <title>Disaster Patrol - Emergency Report</title>

          <style>
            * {
              box-sizing: border-box;
            }

            body {
              margin: 0;
              padding: 40px;
              background: #f2f2ef;
              color: #202322;
              font-family: Arial, sans-serif;
            }

            .report {
              max-width: 900px;
              margin: auto;
              background: white;
              padding: 42px;
              border: 1px solid #c8cbc8;
            }

            .header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              border-bottom: 4px solid #252928;
              padding-bottom: 20px;
              margin-bottom: 25px;
            }

            .brand {
              font-size: 28px;
              font-weight: 900;
              letter-spacing: 2px;
            }

            .subtitle {
              margin-top: 5px;
              color: #666;
              font-size: 11px;
              letter-spacing: 1.5px;
            }

            .classification {
              padding: 7px 10px;
              border: 1px solid #9a4038;
              color: #9a4038;
              font-size: 10px;
              font-weight: bold;
            }

            h2 {
              font-size: 18px;
              margin-top: 30px;
              border-bottom: 1px solid #ccc;
              padding-bottom: 8px;
            }

            .grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 10px;
            }

            .item {
              padding: 13px;
              border: 1px solid #d4d6d4;
              background: #f7f7f4;
            }

            .label {
              display: block;
              color: #777;
              font-size: 9px;
              font-weight: bold;
              letter-spacing: 1px;
            }

            .value {
              display: block;
              margin-top: 6px;
              font-size: 17px;
              font-weight: bold;
            }

            .incident {
              margin-top: 10px;
              padding: 15px;
              border-left: 4px solid #9a4038;
              background: #f5f5f2;
            }

            .incident strong {
              display: block;
              margin-bottom: 5px;
            }

            .footer {
              margin-top: 40px;
              padding-top: 15px;
              border-top: 1px solid #ccc;
              display: flex;
              justify-content: space-between;
              color: #777;
              font-size: 9px;
            }

            @media print {
              body {
                padding: 0;
                background: white;
              }

              .report {
                border: none;
              }
            }
          </style>
        </head>

        <body>

          <div class="report">

            <div class="header">

              <div>
                <div class="brand">
                  DISASTER PATROL
                </div>

                <div class="subtitle">
                  NATIONAL DISASTER RESPONSE COMMAND
                </div>
              </div>

              <div class="classification">
                OPERATIONAL REPORT
              </div>

            </div>

            <div>
              <strong>Report generated:</strong>
              ${reportDate}
            </div>

            <h2>OPERATIONAL STATUS</h2>

            <div class="grid">

              <div class="item">
                <span class="label">
                  ACTIVE INCIDENTS
                </span>

                <span class="value">
                  02
                </span>
              </div>

              <div class="item">
                <span class="label">
                  CRITICAL ALERTS
                </span>

                <span class="value">
                  01
                </span>
              </div>

              <div class="item">
                <span class="label">
                  RESPONSE TEAMS
                </span>

                <span class="value">
                  24
                </span>
              </div>

              <div class="item">
                <span class="label">
                  PEOPLE AFFECTED
                </span>

                <span class="value">
                  20.2K
                </span>
              </div>

              <div class="item">
                <span class="label">
                  REGIONS TRACKED
                </span>

                <span class="value">
                  18
                </span>
              </div>

              <div class="item">
                <span class="label">
                  NETWORK STATUS
                </span>

                <span class="value">
                  ONLINE
                </span>
              </div>

            </div>

            <h2>ACTIVE INCIDENTS</h2>

            <div class="incident">
              <strong>
                CRITICAL — Urban Flooding
              </strong>

              Lucknow, Uttar Pradesh
            </div>

            <div class="incident">
              <strong>
                HIGH — Severe Thunderstorm
              </strong>

              Kanpur, Uttar Pradesh
            </div>

            <div class="incident">
              <strong>
                HIGH — Forest Fire
              </strong>

              Nainital, Uttarakhand
            </div>

            <h2>INTELLIGENCE STATUS</h2>

            <div class="grid">

              <div class="item">
                <span class="label">
                  INCIDENTS MONITORED
                </span>

                <span class="value">
                  04
                </span>
              </div>

              <div class="item">
                <span class="label">
                  AI CONFIDENCE
                </span>

                <span class="value">
                  98.7%
                </span>
              </div>

            </div>

            <div class="footer">
              <span>
                DISASTER PATROL // COMMAND SYSTEM
              </span>

              <span>
                AUTHORIZED OPERATIONS PERSONNEL
              </span>
            </div>

          </div>

          <script>
            window.onload = function () {
              window.print();
            };
          </script>

        </body>
      </html>
    `);

    reportWindow.document.close();
  };

  return (
    <div className="dashboard-page">

      <DashboardMap />

      <div className="dashboard-map-header">

        <div className="map-command-status">
          <span className="status-pulse" />
          LIVE DISASTER NETWORK
        </div>

        <div className="map-location-indicator">
          <MapPin size={13} />
          INDIAN SUBCONTINENT
        </div>

      </div>

      <div className="dashboard-overlay-content">

        <div className="welcome-section">

          <div>
            <p className="welcome-label">
              DISASTER PATROL / COMMAND
            </p>

            <h2>
              Emergency Operations Center
            </h2>

            <p>
              Real-time monitoring and coordinated
              disaster response network.
            </p>
          </div>

          <button
            className="primary-button"
            onClick={generateReport}
          >
            GENERATE REPORT
          </button>

        </div>

        <section className="command-stats">

          <div className="command-stat">

            <div className="command-stat-icon danger">
              <ShieldAlert size={18} />
            </div>

            <div>
              <span>ACTIVE INCIDENTS</span>
              <strong>02</strong>
            </div>

          </div>

          <div className="command-stat">

            <div className="command-stat-icon warning">
              <AlertTriangle size={18} />
            </div>

            <div>
              <span>CRITICAL ALERTS</span>
              <strong>01</strong>
            </div>

          </div>

          <div className="command-stat">

            <div className="command-stat-icon blue">
              <Radio size={18} />
            </div>

            <div>
              <span>RESPONSE TEAMS</span>
              <strong>24</strong>
            </div>

          </div>

          <div className="command-stat">

            <div className="command-stat-icon green">
              <Users size={18} />
            </div>

            <div>
              <span>PEOPLE AFFECTED</span>
              <strong>20.2K</strong>
            </div>

          </div>

        </section>

        <div className="dashboard-grid">

          <div className="dashboard-main-column">

            <div className="intel-panel">

              <div className="intel-panel-header">

                <div>
                  <p>
                    REGIONAL INTELLIGENCE
                  </p>

                  <h3>
                    Operational Overview
                  </h3>
                </div>

                <div className="intel-live">
                  <Activity size={13} />
                  SYSTEM ACTIVE
                </div>

              </div>

              <div className="intel-body">

                <div className="intel-item">
                  <span>
                    INCIDENTS MONITORED
                  </span>

                  <strong>
                    04
                  </strong>
                </div>

                <div className="intel-item">
                  <span>
                    REGIONS TRACKED
                  </span>

                  <strong>
                    18
                  </strong>
                </div>

                <div className="intel-item">
                  <span>
                    AI CONFIDENCE
                  </span>

                  <strong>
                    98.7%
                  </strong>
                </div>

                <div className="intel-item">
                  <span>
                    NETWORK STATUS
                  </span>

                  <strong className="online">
                    ONLINE
                  </strong>
                </div>

              </div>

            </div>

            <section className="stats-grid">

              <StatCard
                title="Total Requests"
                value="24,892"
                change="+12.5%"
                icon="requests"
              />

              <StatCard
                title="AI Responses"
                value="18,420"
                change="+8.2%"
                icon="ai"
              />

              <StatCard
                title="Avg. Response Time"
                value="1.24s"
                change="-14.8%"
                icon="speed"
              />

              <StatCard
                title="Success Rate"
                value="98.7%"
                change="+2.1%"
                icon="success"
              />

            </section>

            <UsageChart />

          </div>

          <div className="dashboard-side-column">

            <div className="incident-radar-panel">

              <div className="panel-title-row">

                <div>
                  <p>
                    THREAT MONITOR
                  </p>

                  <h3>
                    Incident Radar
                  </h3>
                </div>

                <span className="radar-live">
                  LIVE
                </span>

              </div>

              <div className="radar-list">

                <div className="radar-item critical">

                  <div>
                    <strong>
                      Urban Flooding
                    </strong>

                    <span>
                      Lucknow, Uttar Pradesh
                    </span>
                  </div>

                  <b>
                    CRITICAL
                  </b>

                </div>

                <div className="radar-item high">

                  <div>
                    <strong>
                      Severe Thunderstorm
                    </strong>

                    <span>
                      Kanpur, Uttar Pradesh
                    </span>
                  </div>

                  <b>
                    HIGH
                  </b>

                </div>

                <div className="radar-item high">

                  <div>
                    <strong>
                      Forest Fire
                    </strong>

                    <span>
                      Nainital, Uttarakhand
                    </span>
                  </div>

                  <b>
                    HIGH
                  </b>

                </div>

              </div>

            </div>

            <ModelHealth />

            <ActivityFeed />

          </div>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   APP
   ========================================================= */

function App() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [currentPage, setCurrentPage] =
    useState("dashboard");

  const [booting, setBooting] =
    useState(true);

  return (
    <>
      {booting && (
        <BootSequence
          onComplete={() => setBooting(false)}
        />
      )}

      <div className="app-shell">

        <Sidebar
          open={sidebarOpen}
          onClose={() =>
            setSidebarOpen(false)
          }
          onNavigate={setCurrentPage}
          currentPage={currentPage}
        />

        <div className="main-area">

          <Header
            onMenuClick={() =>
              setSidebarOpen(true)
            }
          />

          <main className="dashboard-content">

            {currentPage === "dashboard" && (
              <Dashboard />
            )}

            {currentPage === "incidents" && (
              <Incidents />
            )}

            {currentPage === "live-map" && (
              <LiveMap />
            )}

            {currentPage === "ai-prediction" && (
              <AIPrediction />
            )}

            {currentPage !== "dashboard" &&
              currentPage !== "incidents" &&
              currentPage !== "live-map" &&
              currentPage !== "ai-prediction" && (

                <div className="coming-soon">

                  <Siren size={30} />

                  <p>
                    DISASTER PATROL
                  </p>

                  <h2>
                    Module coming online
                  </h2>

                  <span>
                    This command module is currently
                    being configured.
                  </span>

                </div>

              )}

          </main>

        </div>

      </div>
    </>
  );
}

export default App;