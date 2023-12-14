import express from 'express';
const router = express.Router();
import { getAllBooks, registerBook } from '../controller/bookController.js';

router.get('/', getAllBooks);
router.post('/register', registerBook);

export default router;