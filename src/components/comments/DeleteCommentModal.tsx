import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { SET_BLOGS_COUNT, TOAST_TYPE } from "@/lib/constants";
import { customToast, truncateText } from "@/lib/utils";
import { deleteBlog, getBlogs } from "@/redux/action-creators/blogActions";
import { getComments } from "@/redux/action-creators/commentActions";
import { setBlog, setBlogsCount } from "@/redux/slices/blogSlice";
import { setComment } from "@/redux/slices/commentSlice";
import { setCommentDeleteModal, setDeleteModal } from "@/redux/slices/modalSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { usePage } from "@/src/hooks/usePage";
import { DialogClose } from "@radix-ui/react-dialog";
import { useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router";

const DeleteCommentDialog = () => {
    const page = usePage();
    const [isPending, startTransition] = useTransition();
    const auth = useSelector((state: RootState) => state.user.auth);
    const dispatch = useDispatch<AppDispatch>();
    const { selectedComment } = useSelector((state: RootState) => state.comment);
    const { selectedBlog } = useSelector((state: RootState) => state.blog);
    const { commentDeleteModalOpen } = useSelector((state: RootState) => state.modal);

    function handleClose() {
        dispatch(setCommentDeleteModal(false));
    }

    const handleOpenChange = (value: boolean) => {
        if (!value) {
            handleClose();
            dispatch(setComment(null));
        }
    };

    async function handleSubmit() {
        startTransition(async () => {
            try {
                if (selectedComment) {
                    await dispatch(
                        deleteBlog({
                            user_id: auth.user!.id,
                            id: selectedComment.id,
                        })
                    ).unwrap();
                    await dispatch(getComments({ page, blog_id: selectedBlog?.id as string }));
                    handleClose();
                    dispatch(setBlog(null));
                    customToast({ text: "Comment successfully deleted" });
                }
            } catch (err) {
                customToast({ text: "Something went wrong", type: TOAST_TYPE[1] });
            }
        });
    }

    return (
        <Dialog open={commentDeleteModalOpen} onOpenChange={handleOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Comment</DialogTitle>
                    <DialogDescription>Are you sure you want to delete this comment?</DialogDescription>
                </DialogHeader>

                <p className="font-bold my-4">{selectedComment?.comment && truncateText(selectedComment?.comment, 200)}</p>
                <DialogFooter className="mt-3">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </DialogClose>

                    <Button disabled={isPending} onClick={handleSubmit} type="submit" className="hover:cursor-pointer">
                        {isPending && <Spinner />} Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteCommentDialog;
