import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabase";
import { createUserType } from "@/lib/types";

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

export const registerUser = createAsyncThunk("users/registerUser", async (fields: createUserType, thunkApi) => {
    try {
        const { data, error } = await supabase.auth.signUp({
            email: fields.email,
            password: fields.password,
            options: {
                emailRedirectTo: "/my-blogs",
            },
        });

        if (error) {
            throw new Error(error.message);
        }

        return data;
    } catch (error: any) {
        const message = error.message;
        return thunkApi.rejectWithValue(message);
    }
});
