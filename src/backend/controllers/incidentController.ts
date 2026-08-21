import { Request, Response } from "express";
import {
  getAllIncidents,
  createIncident,
} from "../models/incidentModel";
import { predictCityRisk } from "../services/predictionService";

export const predictRisk = async (req: Request, res: Response) => {
  try {
    const { city, rainfall, riverLevel, soilMoisture, temperature, windSpeed } = req.body;
    const values = [rainfall, riverLevel, soilMoisture, temperature, windSpeed];

    if (!city || values.some((value) => typeof value !== "number" || value < 0 || value > 100)) {
      return res.status(400).json({
        success: false,
        message: "City and five numeric risk factors from 0 to 100 are required",
      });
    }

    return res.status(200).json({ success: true, data: predictCityRisk({ city, rainfall, riverLevel, soilMoisture, temperature, windSpeed }) });
  } catch (error) {
    console.error("Error generating risk prediction:", error);
    return res.status(500).json({ success: false, message: "Failed to generate prediction" });
  }
};

export const getIncidents = async (
  req: Request,
  res: Response
) => {
  try {
    const incidents = await getAllIncidents();

    res.status(200).json({
      success: true,
      data: incidents,
    });
  } catch (error) {
    console.error("Error fetching incidents:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch incidents",
    });
  }
};

export const addIncident = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      title,
      description,
      disaster_type,
      severity,
      location,
      reported_by,
    } = req.body;

    if (!title || !disaster_type || !severity || !location) {
      return res.status(400).json({
        success: false,
        message:
          "Title, disaster type, severity and location are required",
      });
    }

    const result = await createIncident({
      title,
      description,
      disaster_type,
      severity,
      location,
      reported_by,
    });

    res.status(201).json({
      success: true,
      message: "Incident created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error creating incident:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create incident",
    });
  }
};