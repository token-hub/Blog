import Blog from "./blog";
import type { blogsType } from "@/lib/types";

const Blogs = ({ blogs = [] }: { blogs: blogsType }) => {
    return (
        blogs &&
        blogs.length > 0 &&
        blogs.map((blog) => {
            return <Blog key={blog.id} {...blog} />;
        })
    );
};

export default Blogs;
