import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { blogType, blogsType } from "../../lib/types";

type blogSliceType = {
    blogs: blogsType;
    selectedBlog: blogType | null;
};

const initialState: blogSliceType = {
    blogs: null,
    selectedBlog: null,
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
});

export const { setBlog, setBlogs, resetState } = blogSlice.actions;

export default blogSlice.reducer;
