import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/mongodb.js';
import userRouter from './routes/userRoutes.js';

const port = process.env.PORT || 4000;
const app = express();
await connectDB();

app.use(cors());
app.use(express.json()); // सभी API के लिए JSON parser

// Webhook के लिए express.raw() का सही उपयोग
app.use('/user/webhooks', express.raw({ type: 'application/json' }));

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
