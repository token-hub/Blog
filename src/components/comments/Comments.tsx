import { useDispatch, useSelector } from "react-redux";
import CommentForm from "./CommentForm";
import type { AppDispatch, RootState } from "@/redux/store";
import { useSearchParams } from "react-router";
import { useEffect } from "react";
import { getComments } from "@/redux/action-creators/commentActions";
import Loader from "../Loader";
import SingleComment from "./SingleComment";
import EditCommentModal from "./EditCommentModal";

const Comments = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { selectedBlog } = useSelector((state: RootState) => state.blog);
    const { comments, loading } = useSelector((state: RootState) => state.comment);
    const [searchParams] = useSearchParams();
    const page = searchParams.get("page") ?? 1;

    useEffect(() => {
        dispatch(getComments({ page: +page, blog_id: selectedBlog?.id as string }));
    }, [dispatch, page, selectedBlog?.id]);

    return (
        <div className="mt-4">
            <EditCommentModal />
            <h2 className="text-2xl font-bold">Comments</h2>
            <hr className="my-3" />
            <CommentForm />
            {loading && <Loader />}
            {!loading && comments.length < 1 ? (
                <div className="flex justify-center items-center">
                    <hr className="my-3" />
                    <h3 className="text-2xl">No Comments Found</h3>
                </div>
            ) : (
                comments.map((comment) => {
                    return <SingleComment key={comment.id} comment={comment} />;
                })
            )}
        </div>
    );
};

export default Comments;
