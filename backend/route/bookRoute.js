import express from 'express';
const router = express.Router();
import { getAllBooks, registerBook,getBookById } from '../controller/bookController.js';

router.get('/', getAllBooks);
router.post('/register', registerBook);
router.get('/:id', getBookById);

export default router;