import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './config/dbConnection.js';
import authRouter from './routes/authRoute.js';

dotenv.config();

dbConnect()

const app = express();
const port = process.env.PORT || 7000;

app.use(express.json());
app.use('/api/auth', authRouter)

app.listen(port, () => { 
    console.log(`Server is running on port: ${port}`);
});
