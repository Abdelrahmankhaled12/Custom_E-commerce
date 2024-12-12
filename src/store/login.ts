import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the state type
interface ReservationsState {
    loginStatus: Boolean; 
    userData: any; 
}

// Initial state
const initialState: ReservationsState = {
    loginStatus: false,
    userData:null,
};

// Create the slice using Redux Toolkit
export const login = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLoginStatus: (state) => {
            state.loginStatus = !state.loginStatus
        },
        setUserData: (state, action: PayloadAction<any>) => {
            state.userData = action.payload;
        },
    },
});

// Action creators are generated for each reducer function
export const { setLoginStatus, setUserData } = login.actions;

// Export the reducer to be used in the store
export default login.reducer;