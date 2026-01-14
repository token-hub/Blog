import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

type modalSliceType = {
    open: boolean;
    deleteModalOpen: boolean;
};

const initialState: modalSliceType = {
    open: false,
    deleteModalOpen: false,
};

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setModal: (state, action: PayloadAction<boolean>) => {
            state.open = action.payload;
        },
        setDeleteModal: (state, action: PayloadAction<boolean>) => {
            state.deleteModalOpen = action.payload;
        },
        resetState: (state) => {
            state.open = initialState.open;
        },
    },
});

export const { setModal, setDeleteModal, resetState } = modalSlice.actions;

export default modalSlice.reducer;
