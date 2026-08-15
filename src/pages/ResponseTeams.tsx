import { Users, MapPin, Clock, Radio, CheckCircle } from "lucide-react";
import "../styles/ResponseTeams.css";

interface Team {
  id: number;
  name: string;
  type: "Medical" | "Rescue" | "Logistics" | "Communication";
  location: string;
  membersActive: number;
  membersTotal: number;
  status: "deployed" | "standby" | "returning";
  lastUpdate: string;
  incidentsResolved: number;
}

const teamsData: Team[] = [
  {
    id: 1,
    name: "Alpha Medical Team",
    type: "Medical",
    location: "Lucknow Flood Zone",
    membersActive: 12,
    membersTotal: 15,
    status: "deployed",
    lastUpdate: "2 mins ago",
    incidentsResolved: 45,
  },
  {
    id: 2,
    name: "Bravo Rescue Unit",
    type: "Rescue",
    location: "Kanpur Storm Area",
    membersActive: 8,
    membersTotal: 10,
    status: "deployed",
    lastUpdate: "5 mins ago",
    incidentsResolved: 32,
  },
  {
    id: 3,
    name: "Charlie Logistics",
    type: "Logistics",
    location: "Nainital Fire Zone",
    membersActive: 6,
    membersTotal: 8,
    status: "standby",
    lastUpdate: "15 mins ago",
    incidentsResolved: 28,
  },
  {
    id: 4,
    name: "Delta Communications",
    type: "Communication",
    location: "Command Center",
    membersActive: 10,
    membersTotal: 10,
    status: "deployed",
    lastUpdate: "1 min ago",
    incidentsResolved: 56,
  },
  {
    id: 5,
    name: "Echo Medical Team",
    type: "Medical",
    location: "Delhi Medical Center",
    membersActive: 14,
    membersTotal: 16,
    status: "standby",
    lastUpdate: "8 mins ago",
    incidentsResolved: 38,
  },
  {
    id: 6,
    name: "Foxtrot Rescue Unit",
    type: "Rescue",
    location: "Dehradun Base",
    membersActive: 9,
    membersTotal: 12,
    status: "returning",
    lastUpdate: "12 mins ago",
    incidentsResolved: 41,
  },
];

function ResponseTeams() {
  const getTeamTypeColor = (type: string) => {
    switch (type) {
      case "Medical":
        return "#dc2626";
      case "Rescue":
        return "#2563eb";
      case "Logistics":
        return "#ea580c";
      case "Communication":
        return "#16a34a";
      default:
        return "#64748b";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "deployed":
        return "#16a34a";
      case "standby":
        return "#eab308";
      case "returning":
        return "#2563eb";
      default:
        return "#64748b";
    }
  };

  const deployedCount = teamsData.filter((t) => t.status === "deployed").length;
  const standbyCount = teamsData.filter((t) => t.status === "standby").length;
  const totalMembers = teamsData.reduce((sum, t) => sum + t.membersActive, 0);

  return (
    <div className="response-teams-page">
      <div className="page-header">
        <div>
          <h1>Response Teams Coordination</h1>
          <p>Real-time monitoring and coordination of emergency response teams</p>
        </div>

        <div className="header-stats">
          <div className="stat-box deployed">
            <Radio size={20} />
            <div>
              <span>DEPLOYED</span>
              <strong>{deployedCount}</strong>
            </div>
          </div>

          <div className="stat-box standby">
            <Clock size={20} />
            <div>
              <span>STANDBY</span>
              <strong>{standbyCount}</strong>
            </div>
          </div>

          <div className="stat-box">
            <Users size={20} />
            <div>
              <span>ACTIVE MEMBERS</span>
              <strong>{totalMembers}</strong>
            </div>
          </div>

          <div className="stat-box">
            <CheckCircle size={20} />
            <div>
              <span>TOTAL TEAMS</span>
              <strong>{teamsData.length}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="teams-grid">
        {teamsData.map((team) => (
          <div
            key={team.id}
            className="team-card"
            style={{
              borderLeftColor: getTeamTypeColor(team.type),
            }}
          >
            <div className="team-header">
              <div>
                <h3>{team.name}</h3>
                <span className="team-type">{team.type} Team</span>
              </div>

              <div
                className="status-badge"
                style={{
                  backgroundColor: getStatusColor(team.status) + "20",
                  color: getStatusColor(team.status),
                }}
              >
                {team.status.toUpperCase()}
              </div>
            </div>

            <div className="team-info">
              <div className="info-item">
                <MapPin size={16} />
                <span>{team.location}</span>
              </div>

              <div className="info-item">
                <Clock size={16} />
                <span>{team.lastUpdate}</span>
              </div>
            </div>

            <div className="team-stats">
              <div className="stat-item">
                <div className="stat-label">Active Members</div>
                <div className="stat-value">
                  {team.membersActive}
                  <span className="stat-total">/{team.membersTotal}</span>
                </div>
              </div>

              <div className="stat-item">
                <div className="stat-label">Incidents Resolved</div>
                <div className="stat-value">{team.incidentsResolved}</div>
              </div>
            </div>

            <div className="member-progress">
              <div
                className="progress-bar"
                style={{
                  backgroundColor:
                    getTeamTypeColor(team.type) + "20",
                }}
              >
                <div
                  className="progress-fill"
                  style={{
                    width: `${(team.membersActive / team.membersTotal) * 100}%`,
                    backgroundColor: getTeamTypeColor(team.type),
                  }}
                />
              </div>
            </div>

            <div className="team-actions">
              <button className="action-btn primary">View Details</button>
              <button className="action-btn secondary">Dispatch</button>
              <button className="action-btn tertiary">Contact</button>
            </div>
          </div>
        ))}
      </div>

      <div className="teams-summary">
        <div className="summary-card">
          <h3>Team Distribution by Type</h3>

          <div className="type-distribution">
            {["Medical", "Rescue", "Logistics", "Communication"].map((type) => {
              const count = teamsData.filter((t) => t.type === type).length;
              return (
                <div key={type} className="type-item">
                  <div className="type-info">
                    <div
                      className="type-dot"
                      style={{
                        backgroundColor: getTeamTypeColor(type),
                      }}
                    />
                    <span>{type}</span>
                  </div>
                  <strong>{count} teams</strong>
                </div>
              );
            })}
          </div>
        </div>

        <div className="summary-card">
          <h3>Overall Performance</h3>

          <div className="performance-stats">
            <div className="perf-stat">
              <span>Total Deployments</span>
              <strong>287</strong>
            </div>

            <div className="perf-stat">
              <span>Average Response Time</span>
              <strong>4.2 min</strong>
            </div>

            <div className="perf-stat">
              <span>Success Rate</span>
              <strong>94.5%</strong>
            </div>

            <div className="perf-stat">
              <span>Lives Supported</span>
              <strong>12,450+</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResponseTeams;
