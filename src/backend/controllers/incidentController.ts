import { Request, Response } from "express";
import {
  getAllIncidents,
  createIncident,
} from "../models/incidentModel";

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