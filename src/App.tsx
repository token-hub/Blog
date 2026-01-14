import "./App.css";

import { router } from "../router";
import { RouterProvider } from "react-router";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "@/redux/action-creators/userActions";
import type { AppDispatch, RootState } from "@/redux/store";
import { ToastContainer } from "react-toastify";
import Loader from "./components/Loader";

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="h-dvh">
                <Loader />
            </div>
        );
    }

    return (
        <>
            <RouterProvider router={router} />
            <ToastContainer />
        </>
    );
}

export default App;
