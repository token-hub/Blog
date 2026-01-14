import { getBlog } from "@/redux/action-creators/blogActions";
import type { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Loader from "../Loader";
import { capitalizedFirstLetter, transformDate } from "@/lib/utils";

const ViewBlog = () => {
    const params = useParams<{ blog_id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { selectedBlog, loading } = useSelector((state: RootState) => state.blog);

    useEffect(() => {
        if (params.blog_id) {
            dispatch(getBlog(params.blog_id));
        }
    }, [dispatch, params]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="w-2/4 mx-auto mt-6">
            <h1 className="text-4xl mb-4">{capitalizedFirstLetter(selectedBlog!.title)}</h1>
            <p className="text-gray mb-4">{transformDate(selectedBlog!.created_at)}</p>
            <p className="leading-6">{selectedBlog!.blog}</p>
        </div>
    );
};

export default ViewBlog;
