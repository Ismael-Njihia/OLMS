import express from 'express';
const router = express.Router();
import { getAllBooks, registerBook,getBookById } from '../controller/bookController.js';
import { authenticateToken, admin } from '../middleware/authMiddleware.js';

router.get('/', getAllBooks);
router.post('/register', authenticateToken, registerBook);
router.get('/:id', getBookById);

export default router;