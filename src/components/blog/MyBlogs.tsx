import { supabase } from "@/lib/supabase";
import Blogs from "./blogs";
import CreateBlogDialog from "./CreateBlogDialog";
import { use } from "react";

const blogPromise = supabase.from("blogs").select("blog, created_at, id, title");

const MyBlogs = () => {
    const { data } = use(blogPromise);

    return (
        <div className="wrapper">
            <div className="flex justify-end">
                <CreateBlogDialog />
            </div>

            <div className="flex items-center justify-center flex-col">
                {data && data.length > 0 ? <Blogs blogs={data} /> : <div className="text-2xl mt-6">Login and create your own blogs :D </div>}
            </div>
        </div>
    );
};

export default MyBlogs;
