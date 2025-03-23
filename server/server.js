import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/mongodb.js';

//App config
const port = process.env.PORT || 4000;
const app = express();
await connectDB();

//Middlewares
app.use(cors());
app.use(express.json());

//Api routes
app.get('/', (req, res) => res.send('Hello World!'))


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})