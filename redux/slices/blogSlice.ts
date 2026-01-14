import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { blogType, blogsType } from "../../lib/types";
import { getBlogs, getBlog } from "../action-creators/blogActions";

type blogSliceType = {
    blogs: blogsType;
    selectedBlog: blogType | null;
    loading: boolean;
    error: unknown;
};

const initialState: blogSliceType = {
    blogs: null,
    selectedBlog: null,
    loading: true,
    error: null,
};

export const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        setBlog: (state, action: PayloadAction<blogType>) => {
            state.selectedBlog = action.payload;
        },
        setBlogs: (state, action: PayloadAction<blogsType>) => {
            state.blogs = action.payload;
        },
        resetState: (state) => {
            state.selectedBlog = initialState.selectedBlog;
            state.blogs = initialState.blogs;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBlogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBlogs.fulfilled, (state, action: PayloadAction<blogsType>) => {
                state.loading = false;
                state.blogs = action.payload;
            })
            .addCase(getBlogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getBlog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBlog.fulfilled, (state, action: PayloadAction<blogType>) => {
                state.loading = false;
                state.selectedBlog = action.payload;
            })
            .addCase(getBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setBlog, setBlogs, resetState } = blogSlice.actions;

export default blogSlice.reducer;
