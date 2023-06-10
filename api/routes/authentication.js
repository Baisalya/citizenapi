import express from 'express';
import { registerUser, loginUser } from '../controllers/authentication.js';
const router = express.Router();
router.get("/",(req,res)=>{
    res.send("this is auth page")
}) 
// Register a new user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

export default router;