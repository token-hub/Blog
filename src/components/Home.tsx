import { useSelector } from "react-redux";
import Blogs from "./blog/blogs";
import type { RootState } from "@/redux/store";
import { useBlogs } from "../hooks/useBlogs";
import BlogPagination from "./Pagination";
import Loader from "./Loader";

const Home = () => {
    const { user } = useSelector((state: RootState) => state.user.auth);
    const { blogs, totalCount, loading } = useBlogs({ user });

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="wrapper">
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

export default Home;
