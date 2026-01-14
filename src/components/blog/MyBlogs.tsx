import { useSelector } from "react-redux";
import Blogs from "./blogs";
import CreateBlogDialog from "./CreateBlogDialog";
import type { RootState } from "@/redux/store";
import DeleteBlogDialog from "./DeleteBlogDialog";
import BlogPagination from "../Pagination";

import Loader from "../Loader";
import { useBlogs } from "@/src/hooks/useBlogs";

const MyBlogs = () => {
    const { user } = useSelector((state: RootState) => state.user.auth);
    const { blogs, totalCount, loading } = useBlogs({ user });

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
                    <div className="text-2xl mt-6">No Blogs Found </div>
                )}
            </div>
        </div>
    );
};

export default MyBlogs;
