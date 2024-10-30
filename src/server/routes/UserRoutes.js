import express from 'express';
import { registerUser, loginUser, logoutUser } from "../controllers/userController.js"

const router = express.Router();

router.post('/login', loginUser)
router.post('/register', registerUser);
router.patch('/:userId/logout', logoutUser);

export default router;
