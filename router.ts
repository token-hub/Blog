import { createBrowserRouter } from "react-router";
import Home from "./src/components/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Home,
    },
]);
