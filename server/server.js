// server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./configs/mongodb.js";
import userRouter from "./routes/userRoutes.js";

const port = process.env.PORT || 4000;
const app = express();
connectDB();

app.use(cors());
app.use(express.json()); // Standard APIs के लिए JSON parser

app.use("/user/webhooks", express.raw({ type: "application/json" })); // Webhook के लिए raw body

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/user", userRouter);

app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});
