import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DiscountState {
    discountStatus: boolean; // Whether the discount is applied
    discount: any; // Discount data if applied, otherwise null
}

const initialState: DiscountState = {
    discountStatus: false,
    discount: null,
};

export const discountSlice = createSlice({
    name: 'discount',
    initialState,
    reducers: {
        /**
         * Toggles the discount status
         */
        toggleDiscountStatus: (state) => {
            state.discountStatus = !state.discountStatus;
        },
        /**
         * Sets the discount data
         * @param action.payload DiscountData object
         */
        setDiscountData: (state, action: PayloadAction<any>) => {
            state.discount = action.payload;
        },
    },
});

export const { toggleDiscountStatus, setDiscountData } = discountSlice.actions;

export default discountSlice.reducer;
