import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
	ISignInRequestDto,
	ISignInResponseDto,
	ISignUpRequestDto,
	IUpdateRequestDto,
} from "../../services/auth/auth.type";
import authService from "../../services/auth/auth.service";
import { authActions } from "./auth.slice";

function* login(action: PayloadAction<ISignInRequestDto>) {
	try {
		yield put(authActions.startLoading());
		const res: ISignInResponseDto = yield call(authService.login, action.payload);
		yield put(authActions.setUser(res.data));
	} catch (error) {
		if (error instanceof AxiosError && error.message) {
			yield put(authActions.setMessage(error.message));
		}
	} finally {
		yield put(authActions.stopLoading());
	}
}

function* register(action: PayloadAction<ISignUpRequestDto>) {
	try {
		yield put(authActions.startLoading());
		const res: ISignInResponseDto = yield call(
			authService.register,
			action.payload
		);
		yield put(authActions.setUser(res.data));
	} catch (error) {
		if (error instanceof AxiosError && error.message) {
			yield put(authActions.setMessage(error.message));
		}
	} finally {
		yield put(authActions.stopLoading());
	}
}

function* remove() {
	try {
		yield put(authActions.startLoading());
		yield call(authService.remove);
		yield put(authActions.reset());
	} catch (error) {
		if (error instanceof AxiosError && error.message) {
			yield put(authActions.setMessage(error.message));
		}
	} finally {
		yield put(authActions.stopLoading());
	}
}

function* update(action: PayloadAction<IUpdateRequestDto>) {
	try {
		yield put(authActions.startLoading());
		const res: ISignInResponseDto = yield call(
			authService.update,
			action.payload
		);
		yield put(authActions.setUser(res.data));
	} catch (error) {
		if (error instanceof AxiosError && error.message) {
			yield put(authActions.setMessage(error.message));
		}
	} finally {
		yield put(authActions.stopLoading());
	}
}

export default function* authWatcher() {
	yield takeLatest(authActions.login, login);
	yield takeLatest(authActions.register, register);
	yield takeLatest(authActions.remove, remove);
	yield takeLatest(authActions.update, update);
}
