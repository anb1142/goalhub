import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {
	ISignInRequestDto,
	ISignInResponseDto,
	ISignUpRequestDto,
} from "../../services/auth/auth.type";
import { useAppSelector } from "../hooks";
import { IAuthState } from "./auth.type";
import authService from "../../services/auth/auth.service";

const cookiedata = Cookies.get("user");
const initialState: IAuthState = {
	user: cookiedata ? JSON.parse(cookiedata) : null,
	isLoading: false,
	message: "",
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		// store reducers
		reset: (state) => {
			authService.logout();
			Object.assign(state, {
				user: null,
				isLoading: false,
				message: "",
			});
		},
		setUser: (state, action: PayloadAction<ISignInResponseDto["data"]>) => {
			state.user = action.payload;
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

		// saga reducers
		login: (_state, _action: PayloadAction<ISignInRequestDto>) => {},
		register: (_state, _action: PayloadAction<ISignUpRequestDto>) => {},
		remove: (_state) => {},
	},
});

export const authActions = authSlice.actions;
export default authSlice;
export const useAuth = () => useAppSelector((state) => state.auth);
