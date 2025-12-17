import express from 'express';
import cors from 'cors';
import { connectdb } from './Config/db.js';
import adminRouter from './Routes/adminRoute.js';
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
connectdb()
app.use(cors({
    origin: ['http://localhost:5173',
        "http://localhost:5174",
    "https://gefen-institute.vercel.app",
    "https://gefen-admin.vercel.app"
    ],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/user', adminRouter);
app.get('/', (req, res) => {
    res.send('Welcome to the back-end server!');
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
