import { AxiosError } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import goalService from "../../services/goals/goal.service";
import { IGoalsDto } from "../../services/goals/goal.type";
import { goalActions } from "./goal.slice";

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

export default function* goalWatcher() {
	yield takeLatest(goalActions.getGoals, getGoals);
}
