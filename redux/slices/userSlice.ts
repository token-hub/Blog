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
};

const initialState: userSliceState = {
    auth: {
        user: null,
        session: null,
    },
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
        builder.addCase(getUser.fulfilled, (state, action: PayloadAction<authType>) => {
            state.auth = action.payload;
        });
    },
});

export const { setUser, resetState } = userSlice.actions;

export default userSlice.reducer;
