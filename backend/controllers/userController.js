const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../model/userModel");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
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

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (!user || !(await bcrypt.compare(password, user.password))) {
		res.status(400);
		throw new Error("Invalid user data");
	}

	res.status(201).json(userData(user));
});

const getMe = asyncHandler(async (req, res) => {
	res.status(200).json(req.user);
});

const userData = (user) => {
	return {
		_id: user.id,
		name: user.name,
		email: user.email,
		token: generateToken(user._id),
	};
};

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};

module.exports = {
	loginUser,
	registerUser,
	getMe,
};
