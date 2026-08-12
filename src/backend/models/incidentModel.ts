import pool from "../config/database";

export interface Incident {
  id?: number;
  title: string;
  description?: string;
  disaster_type: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  location: string;
  status?: "ACTIVE" | "RESOLVED";
  reported_by?: string;
  created_at?: Date;
  updated_at?: Date;
}

export const getAllIncidents = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM incidents ORDER BY created_at DESC"
  );

  return rows;
};

export const createIncident = async (incident: Incident) => {
  const [result] = await pool.execute(
    `INSERT INTO incidents
    (title, description, disaster_type, severity, location, status, reported_by)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      incident.title,
      incident.description || null,
      incident.disaster_type,
      incident.severity,
      incident.location,
      incident.status || "ACTIVE",
      incident.reported_by || null,
    ]
  );

  return result;
};