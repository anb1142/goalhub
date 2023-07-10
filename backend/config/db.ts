import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGODB = process.env.MONGODB || "mongodb://localhost:27017";

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(MONGODB);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

export default connectDB;
