import express from 'express';
const router = express.Router();
import {getAllSettings, createASetting, editASetting} from '../controller/settingController.js';
import { authenticateToken, admin } from '../middleware/authMiddleware.js';

router.get('/', getAllSettings);
router.post('/register', authenticateToken, createASetting)
router.put('/:id', authenticateToken, editASetting);

export default router;