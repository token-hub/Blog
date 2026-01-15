import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { userViewType } from "./userSlice";
import { getComments } from "../action-creators/commentActions";

export type commentType = {
    id: string;
    created_at: string;
    comment: string;
    user: userViewType;
    image_url?: string | null;
};

type commentSliceType = {
    comments: commentType[];
    loading: boolean;
    error: unknown;
};

const initialState: commentSliceType = {
    comments: [],
    loading: true,
    error: null,
};

export const commments = createSlice({
    name: "comment",
    initialState,
    reducers: {
        setComments: (state, action: PayloadAction<commentType[]>) => {
            state.comments = action.payload;
        },
        resetState: (state) => {
            state.comments = initialState.comments;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getComments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getComments.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload;
            })
            .addCase(getComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setComments, resetState } = commments.actions;

export default commments.reducer;
