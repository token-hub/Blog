import { useSelector } from "react-redux";
import CommentForm from "./CommentForm";
import type { RootState } from "@/redux/store";
import Loader from "../Loader";
import SingleComment from "./SingleComment";
import EditCommentModal from "./EditCommentModal";
import DeleteCommentDialog from "./DeleteCommentModal";
import BlogPagination from "../Pagination";
import { PAGINATION_IDENTIFIER } from "@/lib/constants";
import { useComments } from "@/src/hooks/useComments";

const Comments = () => {
    const { selectedBlog } = useSelector((state: RootState) => state.blog);
    const { comments, loading, totalCount } = useComments({ selectedBlog });

    return (
        <div className="mt-4">
            <EditCommentModal />
            <DeleteCommentDialog />
            <h2 className="text-2xl font-bold">Comments</h2>
            <hr className="my-3" />
            <CommentForm />
            {loading && <Loader />}
            {!loading && comments.length < 1 ? (
                <div className="flex justify-center items-center">
                    <hr className="my-8 mb-24" />
                    <h3 className="text-2xl">No Comments Found</h3>
                </div>
            ) : (
                <>
                    {comments.map((comment) => {
                        return <SingleComment key={comment.id} comment={comment} />;
                    })}
                    <BlogPagination identifier={PAGINATION_IDENTIFIER[1]} totalCount={totalCount} />;
                </>
            )}
        </div>
    );
};

export default Comments;
