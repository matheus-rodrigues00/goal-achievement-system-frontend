import { combineReducers } from '@reduxjs/toolkit';
import authSlice from 'store/slices/authSlice';
import goalSlice from 'store/slices/goalSlice';

const rootReducer = combineReducers({
	goal: goalSlice.reducer,
	auth: authSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
