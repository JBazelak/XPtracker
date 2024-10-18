import express from "express";
import { addUserSkill, deleteUserSkill } from "../controllers/skillController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

router.post('/:userId/skills/:skillName', requireAuth, addUserSkill);
router.delete('/:userId/skills/:skillName', requireAuth, deleteUserSkill)

export default router;