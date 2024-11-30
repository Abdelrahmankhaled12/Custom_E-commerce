import loginReducer from './login';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        login: loginReducer,
    },
});

// Define types for dispatch and state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;