import express from "express";
import { addTraining, getTrainings } from "../controllers/trainingController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

router.get(':userId/training', requireAuth, getTrainings)
router.post('/:userId/training', requireAuth, addTraining);

export default router;
