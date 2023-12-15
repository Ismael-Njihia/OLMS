import express from 'express';
import dotenv from 'dotenv';
import userRoute from './route/userRoute.js';
import bookRoute from './route/bookRoute.js';
import transactionRoute from './route/transactionRoute.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.get('/', (req, res) => {
    res.json('Hello from .');
});

app.use('/api/users', userRoute);
app.use('/api/books', bookRoute);
app.use('/api/transactions', transactionRoute);
app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
})