import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { userSlice } from './slices/userSlice';
import { trendPostSlice } from './slices/trendPostSlice';
import { followingPostSlice } from './slices/followingPostSlice';
import { searchPostSlice } from './slices/searchPostSlice';

// const logger = createLogger();

const rootReducer = combineReducers({
  user: userSlice.reducer,
  trendPost: trendPostSlice.reducer,
  followingPost: followingPostSlice.reducer,
  searchPost: searchPostSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  enhancers: (defaultEnhancers) => [...defaultEnhancers],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
