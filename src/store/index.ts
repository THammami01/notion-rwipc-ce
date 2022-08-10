import { configureStore } from '@reduxjs/toolkit';

import { rootReducers } from './reducers';

const store = configureStore({ reducer: rootReducers, devTools: true });

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
