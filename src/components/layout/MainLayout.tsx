import { Outlet } from "react-router";
import Header from "./Header";

const MainLayout = () => {
    return (
        <div className="h-dvh">
            <Header />
            <Outlet />
        </div>
    );
};

export default MainLayout;
