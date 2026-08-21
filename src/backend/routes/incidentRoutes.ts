import { Router } from "express";
import {
  getIncidents,
  addIncident,
  predictRisk,
} from "../controllers/incidentController";

const router = Router();

router.get("/", getIncidents);
router.post("/", addIncident);
router.post("/predict", predictRisk);

export default router;