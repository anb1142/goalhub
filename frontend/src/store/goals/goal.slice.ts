import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
	IAddGoal,
	IGoalDto,
	IGoalIdDto,
	IGoalsDto,
	IUpdateGoal,
} from "../../services/goals/goal.type";
import { useAppSelector } from "../hooks";
import { IGoalsState } from "./goal.type";

const initialState: IGoalsState = {
	goals: [],
	isLoading: false,
	fetched: false,
	message: "",
};

export const goalSlice = createSlice({
	name: "goal",
	initialState,
	reducers: {
		//store reducers
		reset: (state) => {
			Object.assign(state, {
				goals: [],
				isLoading: false,
				fetched: false,
				message: "",
			});
		},
		setGoals: (state, action: PayloadAction<IGoalsDto["data"]>) => {
			state.goals = action.payload;
			state.fetched = true;
		},
		pushGoal: (state, action: PayloadAction<IGoalDto["data"]>) => {
			state.goals = [action.payload, ...state.goals];
		},
		editGoal: (state, action: PayloadAction<IGoalDto["data"]>) => {
			const i = state.goals.findIndex((goal) => goal._id === action.payload._id);
			state.goals[i] = action.payload;
		},
		filterGoal: (state, action: PayloadAction<IGoalIdDto["data"]>) => {
			state.goals = state.goals.filter((goal) => goal._id !== action.payload._id);
		},
		setGoalTrue: (state, action: PayloadAction<IGoalIdDto["data"]>) => {
			const i = state.goals.findIndex((goal) => goal._id === action.payload._id);
			state.goals[i].done = !state.goals[i].done;
		},
		setMessage: (state, action: PayloadAction<string>) => {
			state.message = action.payload;
		},
		startLoading: (state) => {
			state.isLoading = true;
		},
		stopLoading: (state) => {
			state.isLoading = false;
		},

		//saga reducers
		getGoals: (_state) => {},
		createGoal: (_state, _action: PayloadAction<IAddGoal>) => {},
		removeGoal: (_state, _action: PayloadAction<string>) => {},
		markGoal: (_state, _action: PayloadAction<string>) => {},
		updateGoal: (_state, _action: PayloadAction<IUpdateGoal>) => {},
	},
});

export const goalActions = goalSlice.actions;
export default goalSlice;
export const useGoals = () => useAppSelector((state) => state.goal);
