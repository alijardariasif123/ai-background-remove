import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/mongodb.js';
import userRouter from './routes/userRoutes.js';

// App config
const port = process.env.PORT || 4000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database & Start Server
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`✅ Server running on port ${port}`);
    });
}).catch(err => {
    console.error("❌ MongoDB Connection Failed:", err);
});

// API routes
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/user', userRouter);
