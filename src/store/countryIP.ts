import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the state type
interface ReservationsState {
    country: string;
    countryIpData: any; 
}

// Initial state
const initialState: ReservationsState = {
    countryIpData: null,
    country: ''
};

// Create the slice using Redux Toolkit
export const countryIP = createSlice({
    name: 'countryIP',
    initialState,
    reducers: {
        setCountryIPData: (state, action: PayloadAction<any>) => {
            state.countryIpData = action.payload;
        },
    },
});

// Action creators are generated for each reducer function
export const { setCountryIPData } = countryIP.actions;

// Export the reducer to be used in the store
export default countryIP.reducer;