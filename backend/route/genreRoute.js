import express from 'express';
const router = express.Router();

import { getAllGenres,registerGenre } from '../controller/genreController.js';
import { authenticateToken, admin, staff } from '../middleware/authMiddleware.js';

router.get('/', getAllGenres);
router.post('/register', authenticateToken, registerGenre);

export default router;