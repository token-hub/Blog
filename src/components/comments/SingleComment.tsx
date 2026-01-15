import { transformDate } from "@/lib/utils";
import type { commentType } from "@/redux/slices/commentSlice";

const SingleComment = ({ comment }: { comment: commentType }) => {
    return (
        <div className="my-3 border-t border-t-gray-300 pt-4">
            <div className="flex">
                <div className="w-12">
                    <div className="flex">
                        <span className="p-3 w-10 h-10 flex justify-center items-center bg-yellow-400 rounded-full text-white font-bold">
                            {comment.user.email?.slice(0, 2).toString().toUpperCase()}
                        </span>
                    </div>
                </div>
                <div className="mt-2">
                    <p className="capitalize m-0 lead font-bold leading-3">{comment.user.email?.split("@")[0]}</p>
                    <p className="m-0 lead">{transformDate(comment.created_at)}</p>
                </div>
            </div>

            {comment.image_url && (
                <div className="">
                    <img src={comment?.image_url} alt={comment.comment.slice(0, 15)} className="border my-2 w-125 h-80 object-cover rounded-xl"></img>
                </div>
            )}
            <p className="my-2">{comment.comment.charAt(0).toUpperCase() + comment.comment.slice(1)}</p>
        </div>
    );
};

export default SingleComment;
