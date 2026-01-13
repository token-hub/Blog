import "./App.css";

import { router } from "../router";
import { RouterProvider } from "react-router";
import { supabase } from "@/lib/supabase";
import { use } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { setUser } from "@/redux/slices/userSlice";

const userPromise = supabase.auth.getUser();

function App() {
    const authRedux = useSelector((state: RootState) => state.user.auth);
    const dispatch = useDispatch();
    const { data } = use(userPromise);

    if (!authRedux.user) {
        dispatch(setUser(data));
    }

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
