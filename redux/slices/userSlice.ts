import { createSlice } from "@reduxjs/toolkit";
import type { User, Session } from "@supabase/supabase-js";
import type { PayloadAction } from "@reduxjs/toolkit";

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
    name: "counter",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<authType>) => {
            state.auth = action.payload;
        },
        resetState: (state) => {
            state.auth = initialState.auth;
        },
    },
});

export const { setUser, resetState } = userSlice.actions;

export default userSlice.reducer;
