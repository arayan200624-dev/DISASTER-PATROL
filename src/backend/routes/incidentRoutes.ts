import { Router } from "express";
import {
  getIncidents,
  addIncident,
} from "../controllers/incidentController";

const router = Router();

router.get("/", getIncidents);
router.post("/", addIncident);

export default router;