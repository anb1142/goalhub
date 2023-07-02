import { all, fork } from "redux-saga/effects";
import authWatcher from "./auth/auth.saga";
export function* rootSaga() {
	yield all([fork(authWatcher)]);
}
