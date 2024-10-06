import express from 'express';
import {
  getUserProfile,
  registerUser,
  deleteUser,
  updateUser,
  loginUser
} from "../controllers/userController.js"
import { requireAuth } from '../middleware/requireAuth.js';


const router = express.Router();



//Login user

router.post('/login', loginUser)

// Register user
router.post('/register', registerUser);

// GET a single user
router.get('/desktop', requireAuth, getUserProfile);


// DELETE a user
router.delete('/:id', requireAuth, deleteUser);

// UPDATE a user
router.patch('/:id', requireAuth, updateUser);


export default router;
