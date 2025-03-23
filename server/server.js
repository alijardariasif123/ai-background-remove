import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/mongodb.js';

//App config
const port = process.env.PORT || 4000;
const app = express();

try {
    await connectDB();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if the database connection fails
  }

//Middlewares
app.use(cors());
app.use(express.json());

//Api routes
app.get('/', (req, res) => res.send('Hello World!'))

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).send('Internal Server Error');
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})