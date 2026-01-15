import CommentForm from "./CommentForm";

const Comments = () => {
    return (
        <div className="mt-4">
            <h2 className="text-2xl font-bold">Comments</h2>
            <hr className="my-3" />
            <CommentForm />
            <hr className="my-3" />
        </div>
    );
};

export default Comments;
