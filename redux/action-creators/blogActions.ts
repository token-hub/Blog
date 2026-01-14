import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabase";
import { ERROR_CODES, ERROR_CODES_DESCRIPTION, TABLES } from "@/lib/constants";
import type { insertBlogType } from "@/lib/types";

export const getBlogs = createAsyncThunk("blogs/getBlogs", async (_, thunkApi) => {
    try {
        const { data, error } = await supabase.from("blogs").select("blog, created_at, id, title, user_id");
        if (error) throw error;
        return data;
    } catch (error: any) {
        const message = error.message;
        return thunkApi.rejectWithValue(message);
    }
});

export const getBlog = createAsyncThunk("blogs/getBlog", async (blogId: string, thunkApi) => {
    try {
        const { data, error } = await supabase.from("blogs").select("blog, created_at, id, title, user_id").eq("id", blogId).single();
        if (error) throw error;
        return data;
    } catch (error: any) {
        const message = error.message;
        return thunkApi.rejectWithValue(message);
    }
});

export const insertBlog = createAsyncThunk("blogs/insertBlog", async (fields: insertBlogType, thunkApi) => {
    try {
        const { data, error } = await supabase
            .from(TABLES[0])
            .insert({
                title: fields.title,
                blog: fields.blog,
                user_id: fields.user_id,
            })
            .select("id, title, created_at, blog, user_id")
            .single();

        if (error) {
            if (error.code === ERROR_CODES[0]) {
                throw new Error(ERROR_CODES_DESCRIPTION[0]);
            } else {
                throw new Error(error.message);
            }
        }

        return data;
    } catch (error: any) {
        const message = error.message;
        return thunkApi.rejectWithValue(message);
    }
});
