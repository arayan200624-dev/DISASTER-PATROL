import { AlertTriangle, Bell, Clock, MapPin, Users, TrendingUp } from "lucide-react";
import "../styles/Alerts.css";

interface Alert {
  id: number;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  location: string;
  time: string;
  affectedPeople: number;
}

const alertsData: Alert[] = [
  {
    id: 1,
    title: "Urban Flooding",
    description: "Severe flooding reported in low-lying areas",
    severity: "critical",
    location: "Lucknow, Uttar Pradesh",
    time: "2 mins ago",
    affectedPeople: 5000,
  },
  {
    id: 2,
    title: "Severe Thunderstorm",
    description: "Heavy rainfall with lightning strikes expected",
    severity: "high",
    location: "Kanpur, Uttar Pradesh",
    time: "15 mins ago",
    affectedPeople: 2500,
  },
  {
    id: 3,
    title: "Forest Fire",
    description: "Uncontrolled fire spreading in forest area",
    severity: "high",
    location: "Nainital, Uttarakhand",
    time: "42 mins ago",
    affectedPeople: 1200,
  },
  {
    id: 4,
    title: "Heatwave Warning",
    description: "Extreme temperatures forecasted for upcoming week",
    severity: "medium",
    location: "Delhi Region",
    time: "3 hours ago",
    affectedPeople: 8000,
  },
  {
    id: 5,
    title: "Landslide Risk",
    description: "Heavy rains increase landslide probability",
    severity: "medium",
    location: "Himachal Pradesh",
    time: "5 hours ago",
    affectedPeople: 600,
  },
];

function Alerts() {
  const criticalCount = alertsData.filter((a) => a.severity === "critical").length;
  const highCount = alertsData.filter((a) => a.severity === "high").length;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "#dc2626";
      case "high":
        return "#ea580c";
      case "medium":
        return "#eab308";
      case "low":
        return "#16a34a";
      default:
        return "#64748b";
    }
  };

  return (
    <div className="alerts-page">
      <div className="page-header">
        <div>
          <h1>Alerts & Notifications</h1>
          <p>Real-time disaster alert monitoring system</p>
        </div>

        <div className="header-stats">
          <div className="stat-box danger">
            <AlertTriangle size={20} />
            <div>
              <span>CRITICAL</span>
              <strong>{criticalCount}</strong>
            </div>
          </div>

          <div className="stat-box warning">
            <Bell size={20} />
            <div>
              <span>HIGH</span>
              <strong>{highCount}</strong>
            </div>
          </div>

          <div className="stat-box info">
            <TrendingUp size={20} />
            <div>
              <span>TOTAL</span>
              <strong>{alertsData.length}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="alerts-container">
        {alertsData.map((alert) => (
          <div
            key={alert.id}
            className="alert-card"
            style={{
              borderLeftColor: getSeverityColor(alert.severity),
            }}
          >
            <div className="alert-header">
              <div className="alert-title-section">
                <div
                  className="alert-icon"
                  style={{ backgroundColor: getSeverityColor(alert.severity) + "20" }}
                >
                  <AlertTriangle
                    size={20}
                    style={{ color: getSeverityColor(alert.severity) }}
                  />
                </div>

                <div>
                  <h3>{alert.title}</h3>
                  <p>{alert.description}</p>
                </div>
              </div>

              <div
                className="severity-badge"
                style={{
                  backgroundColor: getSeverityColor(alert.severity) + "20",
                  color: getSeverityColor(alert.severity),
                }}
              >
                {alert.severity.toUpperCase()}
              </div>
            </div>

            <div className="alert-meta">
              <div className="meta-item">
                <MapPin size={16} />
                <span>{alert.location}</span>
              </div>

              <div className="meta-item">
                <Clock size={16} />
                <span>{alert.time}</span>
              </div>

              <div className="meta-item">
                <Users size={16} />
                <span>{alert.affectedPeople.toLocaleString()} people affected</span>
              </div>
            </div>

            <div className="alert-actions">
              <button className="action-btn primary">View Details</button>
              <button className="action-btn secondary">Acknowledge</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Alerts;
