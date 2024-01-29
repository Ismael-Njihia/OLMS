import express from 'express';
import dotenv from 'dotenv';
import userRoute from './route/userRoute.js';
import bookRoute from './route/bookRoute.js';
import transactionRoute from './route/transactionRoute.js';
import genreRoute from './route/genreRoute.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import uploadRoute from './route/uploadRoute.js';
import settingRoute from './route/settingRoute.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(path.resolve(),'uploads')))

app.use('/api/users', userRoute);
app.use('/api/books', bookRoute);
app.use('/api/transactions', transactionRoute);
app.use('/api/genres', genreRoute);
app.use('/api/upload', uploadRoute);
app.use('/api/settings', settingRoute);

console.log(process.env.PAYPAL_CLIENT_ID);

app.get('/api/config/paypal', (req, res) => res.send({
    clientId: process.env.PAYPAL_CLIENT_ID}));


const __dirname = path.resolve();

app.use(
    express.static(path.join(__dirname, '/frontend/build'))
)
app.get('*', (req, res) =>
res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
)
app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
})