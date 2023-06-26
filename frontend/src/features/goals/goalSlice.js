import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import goalService from "./goalService";
const initialState = {
	goals: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};
export const createGoal = createAsyncThunk(
	"goals/create",
	async (goalData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await goalService.createGoal(goalData, token);
		} catch (err) {
			const msg =
				(err.response && err.response.data && err.response.data.message) ||
				err.message ||
				err.toString();
			return thunkAPI.rejectWithValue(msg);
		}
	}
);

export const goalSlice = createSlice({
	name: "goal",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(createGoal.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createGoal.fulfilled, (state, action) => {
				Object.assign(state, {
					isLoading: false,
					isError: false,
					isSuccess: true,
					goals: [...state.goals, action.payload],
				});
			})
			.addCase(createGoal.rejected, (state, action) => {
				Object.assign(state, {
					isLoading: false,
					isError: true,
					isSuccess: false,
					message: action.payload,
				});
			});
	},
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
