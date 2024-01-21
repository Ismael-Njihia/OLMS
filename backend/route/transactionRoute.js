import express from 'express';
const router = express.Router();
import { getAllTransactions,
    getTransaction, 
    registerTransaction,
    transactionReturned,
    sendReminder,
     registerTransactionMany } from '../controller/transactionController.js';
import { authenticateToken, admin, staff } from '../middleware/authMiddleware.js';

router.get('/', authenticateToken,getAllTransactions);
router.post('/register', authenticateToken,registerTransaction);
router.post('/registerMany', authenticateToken,registerTransactionMany);
router.put('/:id', authenticateToken, transactionReturned);
router.get('/:id', authenticateToken, getTransaction);
router.post('/reminder/:id', authenticateToken, sendReminder);



export default router;