import "./App.css";

import { router } from "../router";
import { RouterProvider } from "react-router";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "@/redux/action-creators/userActions";
import type { AppDispatch } from "@/redux/store";

function App() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
