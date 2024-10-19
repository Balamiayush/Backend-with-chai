import mongoose from "mongoose";

const connectDB = async function () {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};
export default connectDB;
