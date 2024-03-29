import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGODB = process.env.MONGO_URL || "mongodb://localhost:27017";

const connectDB = async () => {
	console.log(process.env.MONGO_URL);
	try {
		const conn = await mongoose.connect(MONGODB);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

export default connectDB;
