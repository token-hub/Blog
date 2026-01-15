import { getBlog } from "@/redux/action-creators/blogActions";
import type { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Loader from "../Loader";
import { capitalizedFirstLetter, transformDate } from "@/lib/utils";
import { setBlog } from "@/redux/slices/blogSlice";
import Comments from "../comments/Comments";

const ViewBlog = () => {
    const params = useParams<{ blog_id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { selectedBlog, loading } = useSelector((state: RootState) => state.blog);

    useEffect(() => {
        if (params.blog_id) {
            dispatch(getBlog(params.blog_id));
        }

        return () => {
            dispatch(setBlog(null));
        };
    }, [dispatch, params]);

    if (loading || !selectedBlog) {
        return <Loader />;
    }

    return (
        <div className="w-2/4 mx-auto mt-6 pt-4 pb-8">
            {selectedBlog?.image_url && (
                <div className="mb-4 flex justify-center">
                    <img src={selectedBlog?.image_url} alt={selectedBlog.title} className="w-160 h-100 object-cover rounded-xl"></img>
                </div>
            )}

            <h1 className="text-4xl mb-4">{capitalizedFirstLetter(selectedBlog!.title)}</h1>
            <p className="text-gray mb-4">{transformDate(selectedBlog!.created_at)}</p>
            <p className="leading-6">{selectedBlog!.blog}</p>

            <Comments />
        </div>
    );
};

export default ViewBlog;
