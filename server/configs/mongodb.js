import mongoose from "mongoose";


const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
  })

  await mongoose.connect(`${process.env.MONGODB_URI}/bg-removal`)

}
export default connectDB;

// import mongoose from "mongoose";

// const connectDB = async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/bg-removal`)

//         console.log("✅ MongoDB connected successfully");
//     } catch (error) {
//         console.error("❌ MongoDB connection error:", error);
//         process.exit(1);  // अगर connection fail हो तो server बंद हो जाए
//     }
// };

// export default connectDB;