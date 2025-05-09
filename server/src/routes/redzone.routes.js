import express from 'express';
import { getRedZones } from '../controllers/redzone.controller.js';

const router = express.Router();

router.get('/', getRedZones);

export default router;
