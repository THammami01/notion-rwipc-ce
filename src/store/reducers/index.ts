import { combineReducers } from '@reduxjs/toolkit';

import globalReducer from './global.reducer';

export const rootReducers = combineReducers({
  global: globalReducer,
});

export type RootState = ReturnType<typeof rootReducers>;
