import asyncHandler from "express-async-handler";
import Goal from "./goals.model";

export const getGoals = asyncHandler(async (req, res) => {
	const goals = await Goal.find({ user: req.body.auth.id }).sort({
		createdAt: -1,
	});
	res.status(200).json(goals);
});

export const setGoal = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error("add field");
	}
	const goal = await Goal.create({
		text: req.body.text,
		user: req.body.auth.id,
	});
	res.status(200).json(goal);
});

export const updateGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);
	if (!goal) {
		res.status(400);
		throw new Error("Goal not Found");
	}

	if (!req.body.auth || goal.user.toString() !== req.body.auth.id) {
		res.status(401);
		throw new Error(`User not authorized`);
	}

	const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.status(200).json(updatedGoal);
});

export const doGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);
	if (!goal) {
		res.status(400);
		throw new Error("Goal not Found");
	}

	if (!req.body.auth || goal.user.toString() !== req.body.auth.id) {
		res.status(401);
		throw new Error(`User not authorized`);
	}

	const updatedGoal = await Goal.findByIdAndUpdate(
		req.params.id,
		{ done: !goal.done },
		{
			new: true,
		}
	);
	res.status(200).json(updatedGoal);
});

export const deleteGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);
	if (!goal) {
		res.status(400);
		throw new Error("Goal not Found");
	}

	if (!req.body.auth || goal.user.toString() !== req.body.auth.id) {
		res.status(401);
		throw new Error(`User not authorized`);
	}

	await goal.deleteOne();
	res.status(200).json({ _id: req.params.id });
});
