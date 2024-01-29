import express from 'express';
const router = express.Router();
import {getAllOnline, createOnline} from '../controller/onlineController.js';
import { authenticateToken, admin } from '../middleware/authMiddleware.js';

router.get('/', getAllOnline);
router.post('/create', authenticateToken, createOnline);


export default router;