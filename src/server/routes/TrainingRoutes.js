import express from "express";
import { addTraining } from "../controllers/trainingController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

router.post('/api/users/', addTraining);

export default router;
