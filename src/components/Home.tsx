import Blogs from "./blog/blogs";
import { useBlogs } from "../hooks/useBlogs";
import BlogPagination from "./Pagination";
import Loader from "./Loader";
import { PAGINATION_IDENTIFIER } from "@/lib/constants";

const Home = () => {
    const { blogs, totalCount, loading } = useBlogs({ user: null });

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="wrapper">
            <div className="flex items-center justify-center flex-col">
                {blogs && blogs.length > 0 ? (
                    <>
                        <Blogs blogs={blogs} />
                        <BlogPagination identifier={PAGINATION_IDENTIFIER[0]} totalCount={totalCount} />
                    </>
                ) : (
                    <div className="text-2xl mt-6">Login and create your own blogs :D </div>
                )}
            </div>
        </div>
    );
};

export default Home;
