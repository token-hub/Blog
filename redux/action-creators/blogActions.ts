import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabase";
import { ERROR_CODES, ERROR_CODES_DESCRIPTION, TABLES, BLOG_LIMIT, CLOUD_NAME } from "@/lib/constants";
import type { insertBlogType, updateBlogType, deleteBlogType } from "@/lib/types";

export const getBlogsCount = createAsyncThunk("blogs/getBlogsCount", async (user_id: string | undefined, thunkApi) => {
    try {
        let query = supabase.from("blogs").select("*", { count: "exact", head: true }).eq("isDeleted", false);

        if (user_id) {
            query = query.eq("user_id", user_id);
        }

        const { count, error } = await query;

        if (error) throw error;
        return count;
    } catch (error: any) {
        const message = error.message;
        return thunkApi.rejectWithValue(message);
    }
});

export const getBlogs = createAsyncThunk("blogs/getBlogs", async ({ page, user_id }: { page: number; user_id?: string }, thunkApi) => {
    try {
        const offset = (page - 1) * BLOG_LIMIT;
        let query = supabase
            .from("blogs")
            .select("blog, created_at, id, title, user_id")
            .eq("isDeleted", false)
            .order("created_at", { ascending: false }) // newest first
            .limit(BLOG_LIMIT)
            .range(offset, offset + BLOG_LIMIT - 1);

        if (user_id) {
            query = query.eq("user_id", user_id);
        }

        const { data, error } = await query;
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
        let image_url: string = "";

        if (fields.image) {
            const formData = new FormData();
            formData.append("file", fields.image);
            formData.append("upload_preset", "iblog_");
            formData.append("cloud_name", CLOUD_NAME);

            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                image_url = data.url;
            } else {
                throw new Error(data.error || "Something went wrong");
            }
        }

        const { data, error } = await supabase
            .from(TABLES[0])
            .insert({
                title: fields.title,
                blog: fields.blog,
                user_id: fields.user_id,
                image_url,
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

export const updateBlog = createAsyncThunk("blogs/updateBlog", async (fields: updateBlogType, thunkApi) => {
    try {
        const { data, error } = await supabase
            .from(TABLES[0])
            .update({
                title: fields.title,
                blog: fields.blog,
                user_id: fields.user_id,
            })
            .eq("id", fields.id)
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

export const deleteBlog = createAsyncThunk("blogs/deleteBlog", async (fields: deleteBlogType, thunkApi) => {
    try {
        const { data, error } = await supabase
            .from(TABLES[0])
            .update({
                user_id: fields.user_id,
                isDeleted: true,
            })
            .eq("id", fields.id)
            .select("id")
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return data;
    } catch (error: any) {
        const message = error.message;
        return thunkApi.rejectWithValue(message);
    }
});
