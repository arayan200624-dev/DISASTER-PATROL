import {
  AlertTriangle,
  Brain,
  CloudRain,
  Droplets,
  MapPin,
  RefreshCw,
  ShieldAlert,
  Thermometer,
  TrendingUp,
  Waves,
  Wind,
} from "lucide-react";

import "./AIPrediction.css";

type Region = {
  name: string;
  state: string;
  risk: number;
  level: "Critical" | "High" | "Medium" | "Low";
  hazard: string;
};

const regions: Region[] = [
  {
    name: "Lucknow",
    state: "Uttar Pradesh",
    risk: 86,
    level: "Critical",
    hazard: "Flood",
  },
  {
    name: "Kanpur",
    state: "Uttar Pradesh",
    risk: 74,
    level: "High",
    hazard: "Storm",
  },
  {
    name: "Dehradun",
    state: "Uttarakhand",
    risk: 61,
    level: "Medium",
    hazard: "Flash Flood",
  },
  {
    name: "Nainital",
    state: "Uttarakhand",
    risk: 48,
    level: "Medium",
    hazard: "Landslide",
  },
];

const recommendations = [
  "Deploy additional flood-response teams to high-risk areas.",
  "Monitor river levels and rainfall continuously.",
  "Pre-position emergency supplies near vulnerable regions.",
  "Review shelter capacity in affected districts.",
];

export default function AIPrediction() {
  return (
    <div className="ai-prediction-page">
      <div className="ai-prediction-header">
        <div>
          <p className="ai-page-label">AI DISASTER INTELLIGENCE</p>

          <h1>AI Disaster Prediction</h1>

          <p className="ai-page-description">
            Predict emerging disaster risks using environmental,
            geographical and historical intelligence.
          </p>
        </div>

        <button className="run-prediction-button">
          <RefreshCw size={15} />
          Run Prediction
        </button>
      </div>

      <section className="prediction-overview">
        <div className="prediction-main-card">
          <div className="prediction-main-top">
            <div className="prediction-brain">
              <Brain size={25} />
            </div>

            <div>
              <span className="prediction-card-label">
                OVERALL RISK SCORE
              </span>

              <p>Current regional disaster risk</p>
            </div>
          </div>

          <div className="risk-score">
            <strong>78</strong>
            <span>/100</span>
          </div>

          <div className="risk-progress">
            <i />
          </div>

          <div className="risk-footer">
            <span className="risk-critical">
              <i />
              High Risk
            </span>

            <span>Updated 2 min ago</span>
          </div>
        </div>

        <div className="prediction-stat-card">
          <div className="prediction-stat-icon flood">
            <Waves size={20} />
          </div>

          <span>PRIMARY HAZARD</span>

          <strong>Flood</strong>

          <p>82% probability</p>
        </div>

        <div className="prediction-stat-card">
          <div className="prediction-stat-icon confidence">
            <ShieldAlert size={20} />
          </div>

          <span>AI CONFIDENCE</span>

          <strong>94.2%</strong>

          <p>High confidence prediction</p>
        </div>

        <div className="prediction-stat-card">
          <div className="prediction-stat-icon population">
            <AlertTriangle size={20} />
          </div>

          <span>EST. AFFECTED</span>

          <strong>20,270</strong>

          <p>People potentially affected</p>
        </div>
      </section>

      <div className="prediction-grid">
        <section className="regional-risk-card">
          <div className="prediction-section-header">
            <div>
              <p>REGIONAL INTELLIGENCE</p>

              <h2>Regional Risk</h2>

              <span>
                AI-generated disaster risk across monitored regions
              </span>
            </div>

            <div className="prediction-live">
              <i />
              LIVE
            </div>
          </div>

          <div className="region-list">
            {regions.map((region) => (
              <div className="region-row" key={region.name}>
                <div className="region-location-icon">
                  <MapPin size={17} />
                </div>

                <div className="region-info">
                  <strong>{region.name}</strong>

                  <span>
                    {region.state} · {region.hazard}
                  </span>
                </div>

                <div className="region-risk">
                  <div className="region-risk-top">
                    <span>Risk</span>

                    <strong>{region.risk}%</strong>
                  </div>

                  <div className="region-risk-bar">
                    <i
                      className={region.level.toLowerCase()}
                      style={{
                        width: `${region.risk}%`,
                      }}
                    />
                  </div>
                </div>

                <span
                  className={`region-level ${region.level.toLowerCase()}`}
                >
                  {region.level}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="risk-factors-card">
          <div className="prediction-section-header">
            <div>
              <p>MODEL INPUTS</p>

              <h2>Risk Factors</h2>

              <span>Signals influencing the current prediction</span>
            </div>
          </div>

          <div className="factor-list">
            <div className="factor-item">
              <div className="factor-icon rainfall">
                <CloudRain size={17} />
              </div>

              <div className="factor-content">
                <div>
                  <strong>Rainfall</strong>
                  <span>91%</span>
                </div>

                <div className="factor-bar">
                  <i style={{ width: "91%" }} />
                </div>
              </div>
            </div>

            <div className="factor-item">
              <div className="factor-icon river">
                <Waves size={17} />
              </div>

              <div className="factor-content">
                <div>
                  <strong>River Level</strong>
                  <span>84%</span>
                </div>

                <div className="factor-bar">
                  <i style={{ width: "84%" }} />
                </div>
              </div>
            </div>

            <div className="factor-item">
              <div className="factor-icon moisture">
                <Droplets size={17} />
              </div>

              <div className="factor-content">
                <div>
                  <strong>Soil Moisture</strong>
                  <span>72%</span>
                </div>

                <div className="factor-bar">
                  <i style={{ width: "72%" }} />
                </div>
              </div>
            </div>

            <div className="factor-item">
              <div className="factor-icon temperature">
                <Thermometer size={17} />
              </div>

              <div className="factor-content">
                <div>
                  <strong>Temperature</strong>
                  <span>64%</span>
                </div>

                <div className="factor-bar">
                  <i style={{ width: "64%" }} />
                </div>
              </div>
            </div>

            <div className="factor-item">
              <div className="factor-icon wind">
                <Wind size={17} />
              </div>

              <div className="factor-content">
                <div>
                  <strong>Wind Activity</strong>
                  <span>58%</span>
                </div>

                <div className="factor-bar">
                  <i style={{ width: "58%" }} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="prediction-bottom-grid">
        <section className="ai-analysis-card">
          <div className="analysis-heading">
            <div className="analysis-icon">
              <Brain size={19} />
            </div>

            <div>
              <p>AI ANALYSIS</p>
              <h2>Prediction Summary</h2>
            </div>
          </div>

          <div className="analysis-content">
            <div className="analysis-highlight">
              <TrendingUp size={17} />

              <span>
                Flood probability has increased by 18.6% in the
                last 6 hours.
              </span>
            </div>

            <p>
              The AI model identifies elevated flood risk across
              northern Uttar Pradesh. Increased rainfall,
              rising river levels and high soil moisture are the
              primary contributors to the current prediction.
            </p>

            <div className="analysis-metrics">
              <div>
                <span>Prediction Window</span>
                <strong>24–48 hours</strong>
              </div>

              <div>
                <span>Model Version</span>
                <strong>DP-AI v2.4</strong>
              </div>

              <div>
                <span>Last Updated</span>
                <strong>2 min ago</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="recommendations-card">
          <div className="prediction-section-header">
            <div>
              <p>RESPONSE INTELLIGENCE</p>

              <h2>Recommended Actions</h2>

              <span>AI-generated response priorities</span>
            </div>
          </div>

          <div className="recommendation-list">
            {recommendations.map((recommendation, index) => (
              <div
                className="recommendation-item"
                key={recommendation}
              >
                <div className="recommendation-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <span>{recommendation}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}