import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabase";

export const getBlogs = createAsyncThunk("blogs/getBlogs", async (_, thunkApi) => {
    try {
        const { data, error } = await supabase.from("blogs").select("blog, created_at, id, title");
        if (error) throw error;
        return data;
    } catch (error: any) {
        const message = error.message;
        return thunkApi.rejectWithValue(message);
    }
});

export const getBlog = createAsyncThunk("blogs/getBlog", async (blogId: string, thunkApi) => {
    try {
        const { data, error } = await supabase.from("blogs").select("blog, created_at, id, title").eq("id", blogId).single();
        if (error) throw error;
        return data;
    } catch (error: any) {
        const message = error.message;
        return thunkApi.rejectWithValue(message);
    }
});
