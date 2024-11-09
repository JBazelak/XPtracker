import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import {
    addTrainingController,
    getTrainingsController,
    deleteTrainingController,
    updateGoalStatusController,
    updateTrainingStatusController
} from "../controllers/trainingController.js";

const router = express.Router();

router.get(':userId/training', requireAuth, getTrainingsController);
router.post('/:userId/training', requireAuth, addTrainingController);
router.delete('/:userId/training/:trainingId', requireAuth, deleteTrainingController);
router.patch('/:userId/training/:trainingId/goals/:goalId', requireAuth, updateGoalStatusController);
router.patch('/:userId/training/:trainingId', requireAuth, updateTrainingStatusController)
export default router;
