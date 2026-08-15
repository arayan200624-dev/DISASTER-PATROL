import {
  AlertTriangle,
  MapPin,
  ShieldAlert,
  Radio,
  Users,
  Activity,
} from "lucide-react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";

import StatCard from "../components/StatCard";
import UsageChart from "../components/UsageChart";
import ModelHealth from "../components/ModelHealth";
import ActivityFeed from "../components/ActivityFeed";

import "../styles/Dashboard.css";

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
        attributionControl={false}
        className="dashboard-leaflet-map"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          opacity={0.35}
        />

        {mapLocations.map((location) => (
          <CircleMarker
            key={location.name}
            center={location.coordinates}
            radius={8}
            pathOptions={{
              color:
                location.className === "critical"
                  ? "#dc2626"
                  : location.className === "high"
                    ? "#ea580c"
                    : "#64748b",
              fillColor:
                location.className === "critical"
                  ? "#dc2626"
                  : location.className === "high"
                    ? "#ea580c"
                    : "#64748b",
              fillOpacity: 0.85,
              weight: 2,
            }}
          >
            <Popup className="custom-popup">
              <div style={{ fontSize: "12px" }}>
                <strong>{location.name}</strong>
                <br />
                {location.type}
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      <div className="map-dark-overlay" />
      <div className="map-grid-overlay" />

      <div className="map-region-label india-label">INDIA</div>
      <div className="map-region-label pakistan-label">PAKISTAN</div>
      <div className="map-region-label nepal-label">NEPAL</div>
      <div className="map-region-label bangladesh-label">BANGLADESH</div>
    </div>
  );
}

function Dashboard() {
  const stats = {
    activeIncidents: 2,
    criticalAlerts: 1,
    responseTeams: 24,
    peopleAffected: "20.2K",
    incidentsMonitored: 4,
    regionsTracked: 18,
    aiConfidence: "98.7%",
    networkStatus: "ONLINE",
  };

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
          </style>
        </head>
        <body>
          <div class="report">
            <div class="header">
              <div>
                <div class="brand">DISASTER PATROL</div>
                <div class="subtitle">NATIONAL DISASTER RESPONSE COMMAND</div>
              </div>
            </div>
            <div><strong>Report generated:</strong> ${reportDate}</div>
            <h2>OPERATIONAL STATUS</h2>
            <div class="grid">
              <div class="item">
                <span class="label">ACTIVE INCIDENTS</span>
                <span class="value">${stats.activeIncidents}</span>
              </div>
              <div class="item">
                <span class="label">CRITICAL ALERTS</span>
                <span class="value">${stats.criticalAlerts}</span>
              </div>
              <div class="item">
                <span class="label">RESPONSE TEAMS</span>
                <span class="value">${stats.responseTeams}</span>
              </div>
              <div class="item">
                <span class="label">PEOPLE AFFECTED</span>
                <span class="value">${stats.peopleAffected}</span>
              </div>
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
            <div className="alert-badge">
              <AlertTriangle size={14} />
              Active Alert Watch
            </div>
            <p className="welcome-label">DISASTER PATROL / COMMAND</p>
            <h2>Emergency Operations Center</h2>
            <p>
              Real-time monitoring and coordinated disaster response network.
            </p>
          </div>

          <button className="primary-button" onClick={generateReport}>
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
              <strong>{stats.activeIncidents}</strong>
            </div>
          </div>

          <div className="command-stat">
            <div className="command-stat-icon warning">
              <AlertTriangle size={18} />
            </div>
            <div>
              <span>CRITICAL ALERTS</span>
              <strong>{stats.criticalAlerts}</strong>
            </div>
          </div>

          <div className="command-stat">
            <div className="command-stat-icon blue">
              <Radio size={18} />
            </div>
            <div>
              <span>RESPONSE TEAMS</span>
              <strong>{stats.responseTeams}</strong>
            </div>
          </div>

          <div className="command-stat">
            <div className="command-stat-icon green">
              <Users size={18} />
            </div>
            <div>
              <span>PEOPLE AFFECTED</span>
              <strong>{stats.peopleAffected}</strong>
            </div>
          </div>
        </section>

        <div className="dashboard-grid">
          <div className="dashboard-main-column">
            <div className="intel-panel">
              <div className="intel-panel-header">
                <div>
                  <p>REGIONAL INTELLIGENCE</p>
                  <h3>Operational Overview</h3>
                </div>

                <div className="intel-live">
                  <Activity size={13} />
                  SYSTEM ACTIVE
                </div>
              </div>

              <div className="intel-body">
                <div className="intel-item">
                  <span>INCIDENTS MONITORED</span>
                  <strong>{stats.incidentsMonitored}</strong>
                </div>

                <div className="intel-item">
                  <span>REGIONS TRACKED</span>
                  <strong>{stats.regionsTracked}</strong>
                </div>

                <div className="intel-item">
                  <span>AI CONFIDENCE</span>
                  <strong>{stats.aiConfidence}</strong>
                </div>

                <div className="intel-item">
                  <span>NETWORK STATUS</span>
                  <strong className="online">{stats.networkStatus}</strong>
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
                  <p>THREAT MONITOR</p>
                  <h3>Incident Radar</h3>
                </div>

                <span className="radar-live">LIVE</span>
              </div>

              <div className="radar-list">
                <div className="radar-item critical">
                  <div>
                    <strong>Urban Flooding</strong>
                    <span>Lucknow, Uttar Pradesh</span>
                  </div>
                  <b>CRITICAL</b>
                </div>

                <div className="radar-item high">
                  <div>
                    <strong>Severe Thunderstorm</strong>
                    <span>Kanpur, Uttar Pradesh</span>
                  </div>
                  <b>HIGH</b>
                </div>

                <div className="radar-item high">
                  <div>
                    <strong>Forest Fire</strong>
                    <span>Nainital, Uttarakhand</span>
                  </div>
                  <b>HIGH</b>
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

export default Dashboard;
