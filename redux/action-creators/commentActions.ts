import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabase";
import { uploadImageToClaudinary } from "../../lib/utils";
import type { insertCommentType } from "../../lib/types";
import { TABLES } from "../../lib/constants";

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
