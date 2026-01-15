import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import blogReducer from "./slices/blogSlice";
import modalReducer from "./slices/modalSlice";
import commentReducer from "./slices/commentSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        blog: blogReducer,
        modal: modalReducer,
        comment: commentReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
