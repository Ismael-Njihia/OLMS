import express from 'express';
const router = express.Router();
import { getAllBooks,getManyBooks, registerBook,getBookById, updateBook } from '../controller/bookController.js';
import { authenticateToken, admin } from '../middleware/authMiddleware.js';

router.get('/', getAllBooks);
router.post('/register', authenticateToken, registerBook);
router.get('/:id', getBookById);
router.post('/getMany', getManyBooks);
router.put('/:id', authenticateToken, updateBook);

export default router;