import express from 'express';
import { createLocation,getUserLocations,deleteLocation } from '../controllers/location.js';
import { verifyUser } from "../utils/verifyToken.js";


const router = express.Router();
router.post('/users/:userId/locations',verifyUser, createLocation);
router.get('/users/:userId/locations', verifyUser,getUserLocations);
router.delete('/users/:userId/locations/:locationId',verifyUser, deleteLocation);




export default router;
