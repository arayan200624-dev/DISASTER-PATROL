export type PredictionInput = {
  city: string;
  rainfall: number;
  riverLevel: number;
  soilMoisture: number;
  temperature: number;
  windSpeed: number;
};

export type PredictionResult = {
  city: string;
  state: string;
  overallRisk: number;
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  confidence: number;
  primaryHazard: string;
  hazards: Array<{ name: string; probability: number; level: string; reason: string }>;
  factors: Array<{ name: string; score: number; value: string }>;
  affectedEstimate: number;
  forecastWindow: string;
  recommendations: string[];
  generatedAt: string;
};

type CityProfile = {
  state: string;
  flood: number;
  storm: number;
  heat: number;
  landslide: number;
  population: number;
};

const CITY_PROFILES: Record<string, CityProfile> = {
  lucknow: { state: "Uttar Pradesh", flood: 76, storm: 52, heat: 66, landslide: 8, population: 3400000 },
  kanpur: { state: "Uttar Pradesh", flood: 70, storm: 60, heat: 72, landslide: 6, population: 3000000 },
  dehradun: { state: "Uttarakhand", flood: 68, storm: 48, heat: 34, landslide: 70, population: 800000 },
  nainital: { state: "Uttarakhand", flood: 43, storm: 46, heat: 22, landslide: 82, population: 120000 },
  delhi: { state: "Delhi", flood: 58, storm: 55, heat: 88, landslide: 2, population: 32000000 },
  mumbai: { state: "Maharashtra", flood: 84, storm: 66, heat: 55, landslide: 34, population: 21000000 },
  chennai: { state: "Tamil Nadu", flood: 78, storm: 74, heat: 70, landslide: 4, population: 11000000 },
  kolkata: { state: "West Bengal", flood: 82, storm: 70, heat: 68, landslide: 3, population: 15000000 },
  bengaluru: { state: "Karnataka", flood: 56, storm: 42, heat: 54, landslide: 12, population: 13000000 },
};

const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value)));
const levelFor = (risk: number) => risk >= 75 ? "Critical" : risk >= 55 ? "High" : risk >= 30 ? "Medium" : "Low";

export function predictCityRisk(input: PredictionInput): PredictionResult {
  const cityKey = input.city.trim().toLowerCase();
  const profile = CITY_PROFILES[cityKey] || {
    state: "Unknown region", flood: 42, storm: 42, heat: 42, landslide: 18, population: 250000,
  };
  const rainfall = clamp(input.rainfall);
  const riverLevel = clamp(input.riverLevel);
  const soilMoisture = clamp(input.soilMoisture);
  const temperature = clamp(input.temperature);
  const windSpeed = clamp(input.windSpeed);

  const flood = clamp(profile.flood * 0.35 + rainfall * 0.3 + riverLevel * 0.25 + soilMoisture * 0.1);
  const storm = clamp(profile.storm * 0.35 + windSpeed * 0.4 + rainfall * 0.25);
  const heat = clamp(profile.heat * 0.45 + temperature * 0.55);
  const landslide = clamp(profile.landslide * 0.45 + rainfall * 0.25 + soilMoisture * 0.3);
  const hazards = [
    { name: "Flood", probability: flood, level: levelFor(flood), reason: "Rainfall, river level and saturated soil are combining." },
    { name: "Severe Storm", probability: storm, level: levelFor(storm), reason: "Wind activity and rainfall indicate storm potential." },
    { name: "Extreme Heat", probability: heat, level: levelFor(heat), reason: "Temperature readings are above the seasonal safety baseline." },
    { name: "Landslide", probability: landslide, level: levelFor(landslide), reason: "Wet soil and rainfall increase slope instability." },
  ].sort((a, b) => b.probability - a.probability);
  const overallRisk = clamp(hazards[0].probability * 0.45 + hazards[1].probability * 0.25 + hazards[2].probability * 0.15 + hazards[3].probability * 0.15);
  const confidence = clamp(72 + (cityKey in CITY_PROFILES ? 10 : 0) + (input.rainfall >= 0 ? 8 : 0));
  const affectedEstimate = Math.round(profile.population * Math.max(0.01, overallRisk / 1000));
  const recommendations = hazards[0].name === "Flood"
    ? ["Pre-position flood-response teams and rescue boats.", "Monitor rivers, drains and low-lying roads every 30 minutes.", "Verify shelter capacity and prepare evacuation routes.", "Issue a public alert for vulnerable neighborhoods."]
    : hazards[0].name === "Extreme Heat"
      ? ["Open cooling and hydration points across exposed neighborhoods.", "Schedule welfare checks for elderly and outdoor workers.", "Coordinate medical teams for heat-related emergencies.", "Issue heat safety guidance and reduce outdoor exposure."]
      : ["Place response teams on standby near exposed districts.", "Review shelters, communications and evacuation routes.", "Monitor conditions continuously and issue targeted alerts.", "Pre-position medical supplies and emergency transport."];

  return {
    city: input.city.trim(), state: profile.state, overallRisk, riskLevel: levelFor(overallRisk), confidence,
    primaryHazard: hazards[0].name, hazards, affectedEstimate, forecastWindow: "Next 24–48 hours",
    factors: [
      { name: "Rainfall", score: rainfall, value: `${rainfall}% intensity` },
      { name: "River Level", score: riverLevel, value: `${riverLevel}% of alert threshold` },
      { name: "Soil Moisture", score: soilMoisture, value: `${soilMoisture}% saturation` },
      { name: "Temperature", score: temperature, value: `${temperature}% heat anomaly` },
      { name: "Wind Activity", score: windSpeed, value: `${windSpeed}% intensity` },
    ], recommendations, generatedAt: new Date().toISOString(),
  };
}
