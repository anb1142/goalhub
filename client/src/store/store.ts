import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { appReducer } from "./appReducer";
import { rootSaga } from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
	reducer: appReducer,
	middleware: [sagaMiddleware],
	devTools: true,
});

sagaMiddleware.run(rootSaga);

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
