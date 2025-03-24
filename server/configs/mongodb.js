import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on("connected", () => {
        console.log("Mongoose connected to db");
    });

    await mongoose.connect(`${process.env.MONGODB_URI}`, {
        dbName: "bg-removal",
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
};

export default connectDB;
