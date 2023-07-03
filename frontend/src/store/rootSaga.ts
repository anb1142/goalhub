import { all, fork } from "redux-saga/effects";
import authWatcher from "./auth/auth.saga";
import goalWatcher from "./goals/goal.saga";
export function* rootSaga() {
	yield all([fork(authWatcher), fork(goalWatcher)]);
}
