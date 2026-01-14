import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { blogType, blogsType, setBlogsCountType } from "../../lib/types";
import { getBlogs, getBlog, getBlogsCount } from "../action-creators/blogActions";
import { SET_BLOGS_COUNT } from "@/lib/constants";

type blogSliceType = {
    blogs: blogsType;
    selectedBlog: blogType | null;
    totalCount: number;
    loading: boolean;
    error: unknown;
};

const initialState: blogSliceType = {
    blogs: null,
    selectedBlog: null,
    totalCount: 0,
    loading: true,
    error: null,
};

export const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        setBlog: (state, action: PayloadAction<blogType | null>) => {
            state.selectedBlog = action.payload;
        },
        setBlogs: (state, action: PayloadAction<blogsType>) => {
            state.blogs = action.payload;
        },
        setBlogsCount: (state, action: PayloadAction<setBlogsCountType>) => {
            if (action.payload === SET_BLOGS_COUNT[0]) {
                state.totalCount = state.totalCount + 1;
            }

            if (action.payload === SET_BLOGS_COUNT[1]) {
                state.totalCount = state.totalCount - 1;
            }
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
            })
            .addCase(getBlogsCount.fulfilled, (state, action) => {
                if (action?.payload) {
                    state.totalCount = action?.payload;
                }
            });
    },
});

export const { setBlog, setBlogs, resetState, setBlogsCount } = blogSlice.actions;

export default blogSlice.reducer;
