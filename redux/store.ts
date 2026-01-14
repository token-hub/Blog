import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import blogReducer from "./slices/blogSlice";
import modalReducer from "./slices/modalSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        blog: blogReducer,
        modal: modalReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
