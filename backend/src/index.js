import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './config/dbConnection.js';
import authRouter from './routes/authRoute.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';

dotenv.config();

dbConnect()

const app = express();
const port = process.env.PORT || 7000;

app.use(express.json());
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)

app.listen(port, () => { 
    console.log(`Server is running on port: ${port}`);
});
