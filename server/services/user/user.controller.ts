import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import generateToken from "../../utils/generateToken";
import User, { IUser } from "./user.model";
import Goal from "../goals/goals.model";

export const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Add all fields");
	}

	const emailExists = await User.findOne({ email });
	if (emailExists) {
		res.status(400);
		throw new Error("Email is already being used");
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const user = await User.create({
		name,
		email,
		password: hashedPassword,
	});

	if (!user) {
		res.status(400);
		throw new Error("Invalid user data");
	}

	res.status(201).json(userData(user));
});
export const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (!user || !(await bcrypt.compare(password, user.password))) {
		res.status(400);
		throw new Error("Invalid User Data");
	}

	res.status(201).json(userData(user));
});

export const updateUser = asyncHandler(async (req, res) => {
	const { _id } = req.body.auth;

	const user = await User.findByIdAndUpdate(_id, req.body, {
		new: true,
	});
	if (!user) {
		res.status(400);
		throw new Error("Invalid User Data");
	}

	res.status(200).json(userData(user));
});

export const getMe = asyncHandler(async (req, res) => {
	res.status(200).json(req.body.auth);
});

export const deleteUser = asyncHandler(async (req, res) => {
	const { _id } = req.body.auth;
	await User.deleteOne({ _id });
	await Goal.deleteMany({ user: _id });
	res.sendStatus(200);
});

const userData = (user: IUser) => ({
	_id: user._id,
	name: user.name,
	email: user.email,
	token: generateToken(user._id),
});
