import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

type modalSliceType = {
    open: boolean;
};

const initialState: modalSliceType = {
    open: false,
};

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setModal: (state, action: PayloadAction<boolean>) => {
            state.open = action.payload;
        },
        resetState: (state) => {
            state.open = initialState.open;
        },
    },
});

export const { setModal, resetState } = modalSlice.actions;

export default modalSlice.reducer;
