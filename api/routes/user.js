import express from 'express';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user.js';
import { verifyUser } from "../utils/verifyToken.js";


const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id',verifyUser, getUser);
//router.post('/users',verifyUser, createUser);
router.put('/users/:id',verifyUser, updateUser);
router.delete('/users/:id',verifyUser, deleteUser);

export default router;
