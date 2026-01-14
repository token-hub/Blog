import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { blogType, blogsType } from "../../lib/types";
import { getBlogs, getBlog, insertBlog, updateBlog, deleteBlog } from "../action-creators/blogActions";

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
        setBlog: (state, action: PayloadAction<blogType | null>) => {
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
            })
            .addCase(insertBlog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(insertBlog.fulfilled, (state, action: PayloadAction<blogType>) => {
                state.loading = false;
                state.blogs?.unshift(action.payload);
            })
            .addCase(insertBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateBlog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBlog.fulfilled, (state, action: PayloadAction<blogType>) => {
                state.loading = false;

                if (state.blogs) {
                    state.blogs = state.blogs?.map((blog) => {
                        if (blog.id === action.payload.id) {
                            return action.payload;
                        } else {
                            return blog;
                        }
                    });
                }
            })
            .addCase(updateBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteBlog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.loading = false;
                if (state.blogs) {
                    state.blogs = state.blogs?.filter((blog) => {
                        if (blog.id !== action.payload.id) {
                            return action.payload;
                        }
                    });
                }
            })
            .addCase(deleteBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setBlog, setBlogs, resetState } = blogSlice.actions;

export default blogSlice.reducer;
