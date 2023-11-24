import express from "express";
import {
	registerUser,
	loginUser,
	getMe,
	deleteUser,
	updateUser,
} from "./user.controller";
import protect from "../../middleware/authMiddleware";

const UserRoutes = express.Router();

UserRoutes.route(`/`)
	.post(registerUser)
	.delete(protect, deleteUser)
	.put(protect, updateUser);
UserRoutes.post("/login", loginUser);
UserRoutes.get("/me", protect, getMe);

export default UserRoutes;
