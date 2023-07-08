import { IGoalIdDto } from "./../../services/goals/goal.type";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import goalService from "../../services/goals/goal.service";

import { goalActions } from "./goal.slice";
import { IAddGoal, IGoalDto, IGoalsDto } from "../../services/goals/goal.type";

function* getGoals() {
	try {
		yield put(goalActions.startLoading());
		const res: IGoalsDto = yield call(goalService.getGoals);
		yield put(goalActions.setGoals(res.data));
	} catch (error) {
		if (error instanceof AxiosError && error.message)
			yield put(goalActions.setMessage(error.message));
	} finally {
		yield put(goalActions.stopLoading());
	}
}

function* createGoal(action: PayloadAction<IAddGoal>) {
	try {
		yield put(goalActions.startLoading());
		const res: IGoalDto = yield call(goalService.createGoal, action.payload);
		yield put(goalActions.pushGoal(res.data));
	} catch (error) {
		if (error instanceof AxiosError && error.message)
			yield put(goalActions.setMessage(error.message));
	} finally {
		yield put(goalActions.stopLoading());
	}
}

function* removeGoal(action: PayloadAction<string>) {
	try {
		yield put(goalActions.startLoading());
		const res: IGoalIdDto = yield call(goalService.removeGoal, action.payload);
		yield put(goalActions.filterGoal(res.data));
	} catch (error) {
		if (error instanceof AxiosError && error.message)
			yield put(goalActions.setMessage(error.message));
	} finally {
		yield put(goalActions.stopLoading());
	}
}

function* markGoal(action: PayloadAction<string>) {
	try {
		yield put(goalActions.startLoading());
		const res: IGoalIdDto = yield call(goalService.markGoal, action.payload);
		yield put(goalActions.setGoalTrue(res.data));
	} catch (error) {
		if (error instanceof AxiosError && error.message)
			yield put(goalActions.setMessage(error.message));
	} finally {
		yield put(goalActions.stopLoading());
	}
}

export default function* goalWatcher() {
	yield takeLatest(goalActions.getGoals, getGoals);
	yield takeLatest(goalActions.markGoal, markGoal);
	yield takeLatest(goalActions.createGoal, createGoal);
	yield takeLatest(goalActions.removeGoal, removeGoal);
}
