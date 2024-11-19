import express from 'express';
import { registerUser, loginUser, logoutUser, refreshAccessToken  } from "../controllers/userController.js"
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

router.post('/login', loginUser)
router.post('/register', registerUser);
router.patch('/:userId/logout',requireAuth, logoutUser);
router.post('/refresh', refreshAccessToken);
export default router;
