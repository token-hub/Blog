import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabase";
import { uploadImageToClaudinary } from "../../lib/utils";
import type { insertCommentType } from "../../lib/types";
import { COMMENT_LIMIT, TABLES } from "../../lib/constants";

export const createComment = createAsyncThunk("comments/createComment", async (fields: insertCommentType, thunkApi) => {
    try {
        // const image_url = await uploadImageToClaudinary(fields.image);
        const image_url = null;

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

export const getComments = createAsyncThunk("comments/getComments", async ({ page, blog_id }: { page: number; blog_id: string }, thunkApi) => {
    try {
        const offset = (page - 1) * COMMENT_LIMIT;

        const query = supabase
            .from("comments")
            .select(`created_at, id, comment, image_url, user: user_profiles (id, email)`)
            .eq("blog_id", blog_id)
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
