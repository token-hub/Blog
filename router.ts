import { createBrowserRouter } from "react-router";
import Home from "./src/components/Home";
import Login from "./src/components/Login";
import Register from "./src/components/Register";
import MainLayout from "./src/components/layout/MainLayout";
import MyBlogs from "./src/components/blog/MyBlogs";
import ViewBlog from "./src/components/blog/ViewBlog";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            { index: true, Component: Home },
            {
                path: "blogs",
                children: [
                    { index: true, Component: MyBlogs },
                    { path: ":blog_id", Component: ViewBlog },
                ],
            },
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
