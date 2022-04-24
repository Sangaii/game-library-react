import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import playerStatus from './playerStatus';

const reducers = combineReducers({
 playerStatus,
});

export default configureStore({
 reducer: reducers,
 middleware: [createLogger()],
});
