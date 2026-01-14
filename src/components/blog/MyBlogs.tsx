import { useDispatch, useSelector } from "react-redux";
import Blogs from "./blogs";
import CreateBlogDialog from "./CreateBlogDialog";
import { getBlogs } from "@/redux/action-creators/blogActions";
import { useEffect } from "react";
import type { RootState, AppDispatch } from "@/redux/store";

const MyBlogs = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { blogs } = useSelector((state: RootState) => state.blog);

    useEffect(() => {
        dispatch(getBlogs());
    }, [dispatch]);

    return (
        <div className="wrapper">
            <div className="flex justify-end">
                <CreateBlogDialog />
            </div>

            <div className="flex items-center justify-center flex-col">
                {blogs && blogs.length > 0 ? <Blogs blogs={blogs} /> : <div className="text-2xl mt-6">Login and create your own blogs :D </div>}
            </div>
        </div>
    );
};

export default MyBlogs;
