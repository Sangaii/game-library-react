import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import playerStatus from './playerStatus';
import system from './system';

const reducers = combineReducers({
 playerStatus,
 system,
});

const store = configureStore({
 reducer: reducers,
 middleware: [createLogger()],
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
