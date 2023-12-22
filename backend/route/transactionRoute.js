import express from 'express';
const router = express.Router();
import { getAllTransactions, registerTransaction,transactionReturned } from '../controller/transactionController.js';
import { authenticateToken, admin, staff } from '../middleware/authMiddleware.js';

router.get('/', authenticateToken,getAllTransactions);
router.post('/register', authenticateToken,registerTransaction);
router.put('/:id', transactionReturned)


export default router;