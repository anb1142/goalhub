import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db";
import errorHandler from "./middleware/errorMiddleware";
import GoalsRoutes from "./services/goals/goals.routes";
import UserRoutes from "./services/user/user.routes";

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users/", UserRoutes);
app.use("/api/goals/", GoalsRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
