import { TrendingUp, TrendingDown, BarChart3, LineChart as LineChartIcon, PieChart } from "lucide-react";
import "../styles/Analytics.css";

function Analytics() {
  const analyticsData = [
    { month: "Jan", incidents: 12, response: 95, satisfaction: 88 },
    { month: "Feb", incidents: 15, response: 92, satisfaction: 85 },
    { month: "Mar", incidents: 10, response: 97, satisfaction: 91 },
    { month: "Apr", incidents: 18, response: 89, satisfaction: 80 },
    { month: "May", incidents: 14, response: 96, satisfaction: 89 },
    { month: "Jun", incidents: 20, response: 91, satisfaction: 87 },
  ];

  const disasterTypes = [
    { type: "Flooding", count: 28, percentage: 35 },
    { type: "Storms", count: 18, percentage: 22 },
    { type: "Fires", count: 15, percentage: 19 },
    { type: "Earthquakes", count: 12, percentage: 15 },
    { type: "Landslides", count: 7, percentage: 9 },
  ];

  const responseMetrics = [
    {
      label: "Avg Response Time",
      value: "1.24 min",
      change: "-14.8%",
      trend: "down",
    },
    {
      label: "Success Rate",
      value: "98.7%",
      change: "+2.1%",
      trend: "up",
    },
    { label: "Teams Deployed", value: "24", change: "+3", trend: "up" },
    { label: "Lives Saved", value: "2,847", change: "+156", trend: "up" },
  ];

  return (
    <div className="analytics-page">
      <div className="page-header">
        <div>
          <h1>Analytics Dashboard</h1>
          <p>Comprehensive disaster response analytics and insights</p>
        </div>
      </div>

      <div className="metrics-grid">
        {responseMetrics.map((metric, i) => (
          <div key={i} className="metric-card">
            <div className="metric-header">
              <span className="metric-label">{metric.label}</span>
              <div
                className={`trend-badge ${metric.trend}`}
              >
                {metric.trend === "up" ? (
                  <TrendingUp size={14} />
                ) : (
                  <TrendingDown size={14} />
                )}
                <span>{metric.change}</span>
              </div>
            </div>

            <div className="metric-value">{metric.value}</div>
          </div>
        ))}
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Incident Trends</h3>
            <LineChartIcon size={18} />
          </div>

          <div className="simple-chart">
            <div className="chart-bars">
              {analyticsData.map((data, i) => (
                <div key={i} className="bar-wrapper">
                  <div
                    className="bar"
                    style={{
                      height: `${(data.incidents / 20) * 100}%`,
                      backgroundColor: "#2563eb",
                    }}
                  />
                  <div className="bar-label">{data.month}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Disaster Types</h3>
            <PieChart size={18} />
          </div>

          <div className="disaster-list">
            {disasterTypes.map((item, i) => (
              <div key={i} className="disaster-item">
                <div className="disaster-info">
                  <div className="disaster-name">{item.type}</div>
                  <div className="disaster-bar">
                    <div
                      className="disaster-progress"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: ["#dc2626", "#ea580c", "#eab308", "#2563eb", "#16a34a"][i],
                      }}
                    />
                  </div>
                </div>

                <div className="disaster-stats">
                  <span className="count">{item.count}</span>
                  <span className="percent">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="detailed-stats">
        <div className="stats-card">
          <h3>Regional Performance</h3>

          <div className="region-list">
            <div className="region-item">
              <div>
                <strong>Uttar Pradesh</strong>
                <span>18 incidents, 95% response rate</span>
              </div>
              <div className="performance-score">92%</div>
            </div>

            <div className="region-item">
              <div>
                <strong>Uttarakhand</strong>
                <span>12 incidents, 98% response rate</span>
              </div>
              <div className="performance-score">96%</div>
            </div>

            <div className="region-item">
              <div>
                <strong>Delhi Region</strong>
                <span>8 incidents, 99% response rate</span>
              </div>
              <div className="performance-score">98%</div>
            </div>

            <div className="region-item">
              <div>
                <strong>Himachal Pradesh</strong>
                <span>15 incidents, 91% response rate</span>
              </div>
              <div className="performance-score">89%</div>
            </div>
          </div>
        </div>

        <div className="stats-card">
          <h3>System Performance</h3>

          <div className="performance-metrics">
            <div className="perf-item">
              <div className="perf-icon" style={{ backgroundColor: "#2563eb20" }}>
                <BarChart3 size={18} style={{ color: "#2563eb" }} />
              </div>
              <div>
                <span>API Uptime</span>
                <strong>99.9%</strong>
              </div>
            </div>

            <div className="perf-item">
              <div className="perf-icon" style={{ backgroundColor: "#16a34a20" }}>
                <TrendingUp size={18} style={{ color: "#16a34a" }} />
              </div>
              <div>
                <span>Processing Speed</span>
                <strong>450ms avg</strong>
              </div>
            </div>

            <div className="perf-item">
              <div className="perf-icon" style={{ backgroundColor: "#ea580c20" }}>
                <LineChartIcon size={18} style={{ color: "#ea580c" }} />
              </div>
              <div>
                <span>Data Accuracy</span>
                <strong>99.2%</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
