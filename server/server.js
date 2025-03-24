
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/mongodb.js';
import userRouter from './routes/userRoutes.js';

//App config
const port = process.env.PORT || 4000;
const app = express();
await connectDB();

app.use(cors());

// ❌ express.json() को webhooks से पहले मत लगाओ
app.use('/user/webhooks', express.raw({ type: 'application/json' }));
app.use(express.json()); // बाकी API के लिए JSON parser

//Api routes
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
