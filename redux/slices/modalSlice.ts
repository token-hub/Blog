import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

type modalSliceType = {
    open: boolean;
    deleteModalOpen: boolean;
    commentModalOpen: boolean;
    commentDeleteModalOpen: boolean;
};

const initialState: modalSliceType = {
    open: false,
    deleteModalOpen: false,
    commentModalOpen: false,
    commentDeleteModalOpen: false,
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
        setCommentModal: (state, action: PayloadAction<boolean>) => {
            state.commentModalOpen = action.payload;
        },
        setCommentDeleteModal: (state, action: PayloadAction<boolean>) => {
            state.commentDeleteModalOpen = action.payload;
        },
        resetState: (state) => {
            state.open = initialState.open;
            state.deleteModalOpen = initialState.deleteModalOpen;
            state.commentModalOpen = initialState.commentModalOpen;
            state.commentDeleteModalOpen = initialState.commentDeleteModalOpen;
        },
    },
});

export const { setModal, setDeleteModal, resetState, setCommentDeleteModal, setCommentModal } = modalSlice.actions;

export default modalSlice.reducer;
