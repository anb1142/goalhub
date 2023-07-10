import express from "express";
import { registerUser, loginUser, getMe } from "./user.controller";
import protect from "../../middleware/authMiddleware";

const UserRoutes = express.Router();

UserRoutes.post("/", registerUser);
UserRoutes.post("/login", loginUser);
UserRoutes.get("/me", protect, getMe);

export default UserRoutes;
