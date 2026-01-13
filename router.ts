import { createBrowserRouter } from "react-router";
import Home from "./src/components/Home";
import Login from "./src/components/Login";
import Register from "./src/components/Register";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Home,
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
