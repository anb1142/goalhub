import express from "express";
import { registerUser, loginUser, getMe, deleteUser } from "./user.controller";
import protect from "../../middleware/authMiddleware";

const UserRoutes = express.Router();

UserRoutes.post("/", registerUser);
UserRoutes.delete("/", protect, deleteUser);
UserRoutes.post("/login", loginUser);
UserRoutes.get("/me", protect, getMe);

export default UserRoutes;
