/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosError, AxiosResponse } from 'axios';
import { put, all, fork, takeEvery, call } from 'redux-saga/effects';
import { GoalsResponse } from 'types/goal';
import goalSlice from 'store/slices/goalSlice';
import resultSlice from 'store/slices/resultSlice';
import loadingSlice from 'store/slices/loadingSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import * as goalAPI from '../../api/goalAPI';

const { loadGoalListSuccess, loadGoalList, registerGoal, loadCategories, loadCategoriesSuccess } = goalSlice.actions;
const { getResult } = resultSlice.actions;
const { startLoading, finishLoading } = loadingSlice.actions;

function* loadGoalSaga(action: PayloadAction<goalAPI.LoadGoalListParam>) {
	const param = action.payload;
	yield put(startLoading(action.type));
	try {
		const result: AxiosResponse<GoalsResponse> = yield call(goalAPI.loadGoaliLst, param);
		yield put(loadGoalListSuccess(result.data));
	} catch (error) {
		const axiosError = error as AxiosError<any>;
		yield put(getResult({ isSuccess: false, actionType: action.type, error: axiosError }));
	}
	yield put(finishLoading(action.type));
}

function* registerGoalSaga(action: PayloadAction<goalAPI.RegisterGoalBody>) {
	const param = action.payload;
	yield put(startLoading(action.type));
	try {
		const result: AxiosResponse = yield call(goalAPI.postGoal, param);

		yield put(getResult({ isSuccess: true, actionType: action.type }));
	} catch (error) {
		const axiosError = error as AxiosError<any>;
		yield put(getResult({ isSuccess: false, actionType: action.type, error: axiosError }));
	}
	yield put(finishLoading(action.type));
}

function* loadCategoriesSaga(action: PayloadAction) {
	yield put(startLoading(action.type));
	try {
		const result: AxiosResponse<string[]> = yield call(goalAPI.getCategories);

		yield put(loadCategoriesSuccess(result.data));
		yield put(getResult({ isSuccess: true, actionType: action.type }));
	} catch (error) {
		const axiosError = error as AxiosError<any>;

		yield put(getResult({ isSuccess: false, actionType: action.type, error: axiosError }));
	}
	yield put(finishLoading(action.type));
}

function* watchGoalSaga() {
	yield takeEvery(loadGoalList, loadGoalSaga);
}

function* watchLoadCategoriesSaga() {
	yield takeEvery(loadCategories, loadCategoriesSaga);
}

function* watchRegisterGoalSaga() {
	yield takeEvery(registerGoal, registerGoalSaga);
}

export default function* goalSaga() {
	yield all([fork(watchGoalSaga), fork(watchRegisterGoalSaga), fork(watchLoadCategoriesSaga)]);
}
