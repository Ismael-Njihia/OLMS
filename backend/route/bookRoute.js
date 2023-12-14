import express from 'express';
const router = express.Router();
import { getAllBooks } from '../controller/bookController.js';

router.get('/', getAllBooks);

export default router;