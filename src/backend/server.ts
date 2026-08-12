import express from "express";
import incidentRoutes from "./routes/incidentRoutes";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/database";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/incidents", incidentRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "AI Disaster Management API is running 🚨"
  });
});

app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS result");

    res.json({
      message: "MySQL connected successfully!",
      database: rows
    });
  } catch (error) {
    console.error("Database connection error:", error);

    res.status(500).json({
      message: "Database connection failed"
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});