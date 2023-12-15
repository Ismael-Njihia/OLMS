import express from 'express';
const router = express.Router();
import { getAllTransactions, registerTransaction,transactionReturned } from '../controller/transactionController.js';

router.get('/', getAllTransactions);
router.post('/register', registerTransaction);
router.put('/:id', transactionReturned)


export default router;