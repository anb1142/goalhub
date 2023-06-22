import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import Cookies from "js-cookie";
const cookie_data = Cookies.get("user");
const user = cookie_data === undefined ? null : JSON.parse(cookie_data);

const initialState = {
	user: user ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

export const register = createAsyncThunk(
	"auth/register",
	async (user, thunkAPI) => {
		try {
			return await authService.register(user);
		} catch (err) {
			const msg =
				(err.response && err.response.data && err.response.data.message) ||
				err.message ||
				err.toString();
			return thunkAPI.rejectWithValue(msg);
		}
	}
);

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
	try {
		return await authService.login(user);
	} catch (err) {
		const msg =
			(err.response && err.response.data && err.response.data.message) ||
			err.message ||
			err.toString();
		return thunkAPI.rejectWithValue(msg);
	}
});

export const logout = createAsyncThunk("auth/logout", async () => {
	await authService.logout();
});

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		reset: (state) => {
			Object.assign(state, {
				isLoading: false,
				isError: false,
				isSuccess: false,
				message: "",
			});
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				Object.assign(state, {
					isLoading: false,
					isSuccess: true,
					user: action.payload,
				});
			})
			.addCase(register.rejected, (state, action) => {
				Object.assign(state, {
					isLoading: false,
					isError: true,
					message: action.payload,
					user: null,
				});
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				Object.assign(state, {
					isLoading: false,
					isSuccess: true,
					user: action.payload,
				});
			})
			.addCase(login.rejected, (state, action) => {
				Object.assign(state, {
					isLoading: false,
					isError: true,
					message: action.payload,
					user: null,
				});
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
			});
	},
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
