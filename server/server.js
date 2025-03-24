import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/mongodb.js';
import userRouter from './routes/userRoutes.js';

//App config
const port = process.env.PORT || 4000;
const app = express();
await connectDB();

//Middlewares
app.use(cors());
app.use(express.json());

//Api routes
app.get('/', (req, res) => res.send('Hello World!'))
app.use("/api/user", userRouter);
app.use("/api/user/webhooks", express.raw({ type: "application/json" }));  

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})