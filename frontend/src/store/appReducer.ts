import { authSlice } from "./auth/auth.slice";
import { combineReducers } from "@reduxjs/toolkit";

export const appReducer = combineReducers({
	[authSlice.name]: authSlice.reducer,
});
