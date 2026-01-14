import { LogOut, SearchCode } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { resetState } from "@/redux/slices/userSlice";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const auth = useSelector((state: RootState) => state.user.auth);

    function handleLogout() {
        supabase.auth.signOut();
        dispatch(resetState());
        navigate("/login");
    }

    return (
        <div className="border-b">
            <div className="wrapper">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Link to="/" className="pr-2">
                            <p className="flex">
                                <SearchCode className="mr-2 text-yellow-500" />
                                <span className="text-lg font-bold">{`iBlog`}</span>
                            </p>
                        </Link>

                        {auth?.user && (
                            <Link to="/blogs" className="pl-3 font-bold border-l ">
                                Blogs
                            </Link>
                        )}
                    </div>

                    <div className="hidden md:flex items-center">
                        {auth?.user ? (
                            <>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="border bg-yellow-500 text-white hover:bg-white hover:border-yellow-500 hover:text-yellow-500"
                                        >
                                            {auth?.user.email?.split("@")[0]}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56 p-2" align="start">
                                        <DropdownMenuSeparator />
                                        <Button onClick={handleLogout} className="w-52 hover:text-yellow-600 hover:bg-neutral-300">
                                            <LogOut /> Logout
                                        </Button>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        ) : (
                            <Link to="/login">
                                <Button
                                    className="ml-2 border text-white bg-yellow-500 hover:cursor-pointer hover:border-yellow-500 hover:bg-white hover:text-yellow-500 dark:bg-yellow-500  dark:border-yellow-400
    dark:hover:bg-yellow-400 dark:hover:text-white"
                                >
                                    Login
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
