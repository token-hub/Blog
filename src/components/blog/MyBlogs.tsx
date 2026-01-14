import { useDispatch, useSelector } from "react-redux";
import Blogs from "./blogs";
import CreateBlogDialog from "./CreateBlogDialog";
import { getBlogs, getBlogsCount } from "@/redux/action-creators/blogActions";
import { useEffect } from "react";
import type { RootState, AppDispatch } from "@/redux/store";
import DeleteBlogDialog from "./DeleteBlogDialog";
import BlogPagination from "../Pagination";
import { useSearchParams } from "react-router";
import Loader from "../Loader";

const MyBlogs = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.user.auth);
    const { blogs, totalCount, loading } = useSelector((state: RootState) => state.blog);
    const [searchParams] = useSearchParams();
    const page = searchParams.get("page") ?? 1;

    useEffect(() => {
        dispatch(getBlogsCount(user?.id));
    }, [dispatch, user?.id]);

    useEffect(() => {
        dispatch(getBlogs(+page));
    }, [dispatch, page]);

    if (loading) {
        return <Loader />;
    }

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
                        <BlogPagination totalCount={totalCount} />
                    </>
                ) : (
                    <div className="text-2xl mt-6">Login and create your own blogs :D </div>
                )}
            </div>
        </div>
    );
};

export default MyBlogs;
