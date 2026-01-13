import { createBrowserRouter } from "react-router";
import Home from "./src/components/Home";
import Login from "./src/components/Login";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Home,
    },
    {
        path: "/login",
        Component: Login,
    },
]);
