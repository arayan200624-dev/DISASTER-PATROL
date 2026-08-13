import express from "express";
import incidentRoutes from "./routes/incidentRoutes";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/database";

dotenv.config();

const app = express();

const allowedOrigin = process.env.FRONTEND_URL;

app.use(
  cors({
    origin: allowedOrigin || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/api/incidents", incidentRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "AI Disaster Management API is running 🚨" });
});

app.get("/test-db", async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS result");
    res.json({ message: "MySQL connected successfully!", database: rows });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ message: "Database connection failed" });
  }
});

export default app;

// Keep the normal local Node server for development.
if (!process.env.VERCEL) {
  const PORT = Number(process.env.PORT || 5000);
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
