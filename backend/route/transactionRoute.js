import express from 'express';
const router = express.Router();
import { getAllTransactions, registerTransaction } from '../controller/transactionController.js';

router.get('/', getAllTransactions);
router.post('/register', registerTransaction);


export default router;