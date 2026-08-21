import { Router } from "express";
import { predictRisk } from "../controllers/incidentController";

const router = Router();
router.post("/predict", predictRisk);

export default router;
