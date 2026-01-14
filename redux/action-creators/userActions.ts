import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabase";

export const getUser = createAsyncThunk("users/getUser", async (_, thunkApi) => {
    try {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
            throw new Error(error.message);
        }

        return data;
    } catch (error: any) {
        const message = error.message;
        return thunkApi.rejectWithValue(message);
    }
});
