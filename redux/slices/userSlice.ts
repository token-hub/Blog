import { createSlice } from "@reduxjs/toolkit";
import type { User, Session } from "@supabase/supabase-js";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getUser } from "../action-creators/userActions";

type authType = {
    user: User | null;
    session?: Session | null;
};

type userSliceState = {
    auth: authType;
    loading: boolean;
};

const initialState: userSliceState = {
    auth: {
        user: null,
        session: null,
    },
    loading: true,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<authType>) => {
            state.auth = action.payload;
        },
        resetState: (state) => {
            state.auth = initialState.auth;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.fulfilled, (state, action: PayloadAction<authType>) => {
                state.auth = action.payload;
                state.loading = false;
            })
            .addCase(getUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUser.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { setUser, resetState } = userSlice.actions;

export default userSlice.reducer;
