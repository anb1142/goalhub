import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAddGoal, IGoalDto, IGoalsDto } from "../../services/goals/goal.type";
import { IGoalsState } from "./goal.type";
import { useAppSelector } from "../hooks";

const initialState: IGoalsState = {
	goals: [],
	isLoading: false,
	message: "",
};

export const goalSlice = createSlice({
	name: "goal",
	initialState,
	reducers: {
		//store reducers
		reset: (state) => {
			state = initialState;
		},
		setGoals: (state, action: PayloadAction<IGoalsDto["data"]>) => {
			state.goals = action.payload;
		},
		pushGoal: (state, action: PayloadAction<IGoalDto["data"]>) => {
			state.goals = [...state.goals, action.payload];
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
	},
});

export const goalActions = goalSlice.actions;
export default goalSlice;
export const useGoals = () => useAppSelector((state) => state.goal);
