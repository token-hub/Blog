import { useDispatch, useSelector } from "react-redux";
import Blogs from "./blogs";
import CreateBlogDialog from "./CreateBlogDialog";
import { getBlogs } from "@/redux/action-creators/blogActions";
import { useEffect } from "react";
import type { RootState, AppDispatch } from "@/redux/store";
import DeleteBlogDialog from "./DeleteBlogDialog";
import BlogPagination from "../Pagination";

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
                <DeleteBlogDialog />
            </div>

            <div className="flex items-center justify-center flex-col">
                {blogs && blogs.length > 0 ? (
                    <>
                        <Blogs blogs={blogs} />
                        <BlogPagination totalCount={10} />
                    </>
                ) : (
                    <div className="text-2xl mt-6">Login and create your own blogs :D </div>
                )}
            </div>
        </div>
    );
};

export default MyBlogs;
