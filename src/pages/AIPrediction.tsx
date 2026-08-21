import { useState } from "react";
import { AlertTriangle, Brain, CloudRain, Droplets, MapPin, RefreshCw, ShieldAlert, Thermometer, TrendingUp, Waves, Wind } from "lucide-react";
import API_URL from "../config/api";
import "./AIPrediction.css";

type Prediction = {
  city: string; state: string; overallRisk: number; riskLevel: string; confidence: number; primaryHazard: string;
  affectedEstimate: number; forecastWindow: string; generatedAt: string;
  hazards: Array<{ name: string; probability: number; level: string; reason: string }>;
  factors: Array<{ name: string; score: number; value: string }>;
  recommendations: string[];
};

const defaultInputs = { rainfall: 72, riverLevel: 64, soilMoisture: 58, temperature: 54, windSpeed: 46 };
const factorIcons = [CloudRain, Waves, Droplets, Thermometer, Wind];

export default function AIPrediction() {
  const [city, setCity] = useState("Lucknow");
  const [inputs, setInputs] = useState(defaultInputs);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const runPrediction = async () => {
    setLoading(true); setError("");
    try {
      const response = await fetch(`${API_URL}/api/predictions/predict`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ city, ...inputs }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.message || "Prediction service unavailable");
      setPrediction(payload.data);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Prediction service unavailable");
    } finally { setLoading(false); }
  };

  const updateInput = (key: keyof typeof inputs, value: string) => setInputs((current) => ({ ...current, [key]: Number(value) }));

  return (
    <div className="ai-prediction-page">
      <div className="ai-prediction-header"><div><p className="ai-page-label">AI DISASTER INTELLIGENCE</p><h1>City Risk Prediction</h1><p className="ai-page-description">Run an explainable risk analysis using city context and current environmental conditions.</p></div><button className="run-prediction-button" onClick={runPrediction} disabled={loading}><RefreshCw size={15} className={loading ? "spin" : ""} />{loading ? "Analyzing..." : "Run Prediction"}</button></div>

      <section className="prediction-input-card"><div className="prediction-input-heading"><div className="prediction-brain"><Brain size={22} /></div><div><p>ANALYSIS CONTROLS</p><h2>Environmental snapshot</h2></div></div><label className="city-input"><MapPin size={16} /><span>City</span><input value={city} onChange={(event) => setCity(event.target.value)} placeholder="Enter a city" /></label><div className="factor-controls">{Object.entries(inputs).map(([key, value], index) => { const Icon = factorIcons[index]; return <label className="factor-control" key={key}><span><Icon size={15} />{key.replace(/([A-Z])/g, " $1")}</span><strong>{value}%</strong><input type="range" min="0" max="100" value={value} onChange={(event) => updateInput(key as keyof typeof inputs, event.target.value)} /></label>; })}</div>{error && <p className="prediction-error"><AlertTriangle size={15} />{error}. Start the backend with <code>npm run dev</code> inside <code>src/backend</code>.</p>}</section>

      {prediction ? <>
        <section className="prediction-overview"><div className="prediction-main-card"><div className="prediction-main-top"><div className="prediction-brain"><Brain size={25} /></div><div><span className="prediction-card-label">OVERALL RISK SCORE</span><p>{prediction.city}, {prediction.state}</p></div></div><div className="risk-score"><strong>{prediction.overallRisk}</strong><span>/100</span></div><div className="risk-progress"><i style={{ width: `${prediction.overallRisk}%` }} /></div><div className="risk-footer"><span className="risk-critical"><i />{prediction.riskLevel} Risk</span><span>{new Date(prediction.generatedAt).toLocaleTimeString()}</span></div></div><div className="prediction-stat-card"><div className="prediction-stat-icon flood"><Waves size={20} /></div><span>PRIMARY HAZARD</span><strong>{prediction.primaryHazard}</strong><p>{prediction.hazards[0].probability}% probability</p></div><div className="prediction-stat-card"><div className="prediction-stat-icon confidence"><ShieldAlert size={20} /></div><span>AI CONFIDENCE</span><strong>{prediction.confidence}%</strong><p>Transparent model confidence</p></div><div className="prediction-stat-card"><div className="prediction-stat-icon population"><AlertTriangle size={20} /></div><span>EST. AFFECTED</span><strong>{prediction.affectedEstimate.toLocaleString()}</strong><p>People potentially affected</p></div></section>

        <div className="prediction-grid"><section className="regional-risk-card"><div className="prediction-section-header"><div><p>HAZARD INTELLIGENCE</p><h2>{prediction.city} hazard profile</h2><span>Ranked risks returned by the backend model</span></div><div className="prediction-live"><i />LIVE</div></div><div className="region-list">{prediction.hazards.map((hazard) => <div className="region-row" key={hazard.name}><div className="region-location-icon"><MapPin size={17} /></div><div className="region-info"><strong>{hazard.name}</strong><span>{hazard.reason}</span></div><div className="region-risk"><div className="region-risk-top"><span>Probability</span><strong>{hazard.probability}%</strong></div><div className="region-risk-bar"><i className={hazard.level.toLowerCase()} style={{ width: `${hazard.probability}%` }} /></div></div><span className={`region-level ${hazard.level.toLowerCase()}`}>{hazard.level}</span></div>)}</div></section><section className="risk-factors-card"><div className="prediction-section-header"><div><p>MODEL INPUTS</p><h2>Risk factors</h2><span>Signals used in this run</span></div></div><div className="factor-list">{prediction.factors.map((factor, index) => { const Icon = factorIcons[index]; return <div className="factor-item" key={factor.name}><div className="factor-icon rainfall"><Icon size={17} /></div><div className="factor-content"><div><strong>{factor.name}</strong><span>{factor.value}</span></div><div className="factor-bar"><i style={{ width: `${factor.score}%` }} /></div></div></div>; })}</div></section></div>

        <div className="prediction-bottom-grid"><section className="ai-analysis-card"><div className="analysis-heading"><div className="analysis-icon"><Brain size={19} /></div><div><p>AI ANALYSIS</p><h2>Prediction Summary</h2></div></div><div className="analysis-content"><div className="analysis-highlight"><TrendingUp size={17} /><span>{prediction.primaryHazard} is the highest-ranked threat for {prediction.city} over the {prediction.forecastWindow.toLowerCase()}.</span></div><p>The result is calculated from the selected city profile and environmental snapshot. Each hazard score is shown separately so response teams can understand what drives the overall risk.</p><div className="analysis-metrics"><div><span>Prediction Window</span><strong>{prediction.forecastWindow}</strong></div><div><span>Model Version</span><strong>DP-Risk v1.0</strong></div><div><span>Generated</span><strong>{new Date(prediction.generatedAt).toLocaleTimeString()}</strong></div></div></div></section><section className="recommendations-card"><div className="prediction-section-header"><div><p>RESPONSE INTELLIGENCE</p><h2>Recommended Actions</h2><span>Priorities generated for this city</span></div></div><div className="recommendation-list">{prediction.recommendations.map((recommendation, index) => <div className="recommendation-item" key={recommendation}><div className="recommendation-number">{String(index + 1).padStart(2, "0")}</div><span>{recommendation}</span></div>)}</div></section></div>
  </> : <div className="prediction-empty"><Brain size={28} /><h2>Ready to analyze a city</h2><p>Adjust the environmental snapshot and run a prediction to see hazards, risk levels and response actions.</p></div>}
    </div>
  );
}
