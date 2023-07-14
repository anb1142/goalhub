import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db";
import errorHandler from "./middleware/errorMiddleware";
import GoalsRoutes from "./services/goals/goals.routes";
import UserRoutes from "./services/user/user.routes";
import path from "path";

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

if (process.env.NODE_ENV == "production") {
	app.use(express.static(path.join(__dirname, "../frontend/dist")));
	app.get("*", (req, res) =>
		res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
	);
}

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
