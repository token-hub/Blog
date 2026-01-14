import { createBrowserRouter } from "react-router";
import Home from "./src/components/Home";
import Login from "./src/components/Login";
import Register from "./src/components/Register";
import MainLayout from "./src/components/layout/MainLayout";
import MyBlogs from "./src/components/blog/MyBlogs";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            { index: true, Component: Home },
            { path: "blogs", Component: MyBlogs },
        ],
    },
    {
        path: "/login",
        Component: Login,
    },
    {
        path: "/register",
        Component: Register,
    },
]);
