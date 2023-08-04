import express from "express";
import {
	deleteGoal,
	doGoal,
	getGoals,
	setGoal,
	updateGoal,
} from "./goals.controller";
import protect from "../../middleware/authMiddleware";

const GoalsRoutes = express.Router();

GoalsRoutes.route("/").get(protect, getGoals).post(protect, setGoal);
GoalsRoutes.route("/:id")
	.put(protect, updateGoal)
	.delete(protect, deleteGoal)
	.post(protect, doGoal);

export default GoalsRoutes;
