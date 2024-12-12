import packageeReducer from './package';
import loginReducer from './login';
import discountReducer from './discount';
import { configureStore } from '@reduxjs/toolkit';

/**
 * Redux Store Configuration
 * Combines all reducers and applies middleware
 */

export const store = configureStore({
    reducer: {
        login: loginReducer, // Handles login state
        packagee: packageeReducer, // Handles package-related state
        discount: discountReducer, // Handles discount-related state
    },
});

// Define types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;