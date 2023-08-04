import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth/auth.slice";
import goalSlice from "./goals/goal.slice";

export const appReducer = combineReducers({
	[authSlice.name]: authSlice.reducer,
	[goalSlice.name]: goalSlice.reducer,
});
