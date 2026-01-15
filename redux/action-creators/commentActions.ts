import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabase";
import { uploadImageToClaudinary } from "../../lib/utils";
import type { deleteCommentType, insertCommentType, updateCommentType } from "../../lib/types";
import { COMMENT_LIMIT, TABLES } from "../../lib/constants";

export const createComment = createAsyncThunk("comments/createComment", async (fields: insertCommentType, thunkApi) => {
    try {
        const image_url = await uploadImageToClaudinary(fields.image);

        const { data, error } = await supabase.from(TABLES[1]).insert({
            blog_id: fields.blog_id,
            comment: fields.comment,
            user_id: fields.user_id,
            image_url,
        });

        if (error) throw error;
        return data;
    } catch (error: any) {
        const message = error.message;
        return thunkApi.rejectWithValue(message);
    }
});

export const updateComment = createAsyncThunk("comments/updateComment", async (fields: updateCommentType, thunkApi) => {
    try {
        const image_url = await uploadImageToClaudinary(fields.image);

        const { data, error } = await supabase
            .from(TABLES[1])
            .update({
                id: fields.id,
                comment: fields.comment,
                user_id: fields.user_id,
                image_url,
            })
            .eq("id", fields.id);

        if (error) throw error;
        return data;
    } catch (error: any) {
        const message = error.message;
        return thunkApi.rejectWithValue(message);
    }
});

export const getComments = createAsyncThunk("comments/getComments", async ({ page, blog_id }: { page: number; blog_id: string }, thunkApi) => {
    try {
        const offset = (page - 1) * COMMENT_LIMIT;

        const query = supabase
            .from("comments")
            .select(`created_at, id, comment, image_url, user: user_profiles (id, email)`)
            .eq("blog_id", blog_id)
            .eq("isDeleted", false)
            .order("created_at", { ascending: false })
            .limit(COMMENT_LIMIT)
            .range(offset, offset + COMMENT_LIMIT - 1);

        const { data, error } = await query;
        if (error) throw error;
        return data;
    } catch (error: any) {
        const message = error.message;
        return thunkApi.rejectWithValue(message);
    }
});

export const deleteComment = createAsyncThunk("blogs/deleteComment", async (fields: deleteCommentType, thunkApi) => {
    try {
        const { data, error } = await supabase
            .from(TABLES[1])
            .update({
                user_id: fields.user_id,
                isDeleted: true,
            })
            .eq("id", fields.id);

        if (error) {
            throw new Error(error.message);
        }

        return data;
    } catch (error: any) {
        const message = error.message;
        return thunkApi.rejectWithValue(message);
    }
});
