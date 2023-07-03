import { combineReducers } from "@reduxjs/toolkit";
import goalSlice from "./goals/goal.slice";
import authSlice from "./auth/auth.slice";

export const appReducer = combineReducers({
	[authSlice.name]: authSlice.reducer,
	[goalSlice.name]: goalSlice.reducer,
});
