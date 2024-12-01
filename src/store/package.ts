import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the state type
interface ReservationsState {
    package: any; 
}

// Initial state
const initialState: ReservationsState = {
    package:null,
};

// Create the slice using Redux Toolkit
export const packagee = createSlice({
    name: 'packagee',
    initialState,
    reducers: {
        setPackage: (state, action: PayloadAction<any>) => {
            state.package = action.payload;
        },
    },
});

// Action creators are generated for each reducer function
export const { setPackage } = packagee.actions;

// Export the reducer to be used in the store
export default packagee.reducer;