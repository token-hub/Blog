import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { SET_BLOGS_COUNT, TOAST_TYPE } from "@/lib/constants";
import { customToast } from "@/lib/utils";
import { deleteBlog, getBlogs } from "@/redux/action-creators/blogActions";
import { setBlog, setBlogsCount } from "@/redux/slices/blogSlice";
import { setDeleteModal } from "@/redux/slices/modalSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { DialogClose } from "@radix-ui/react-dialog";
import { useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router";

const DeleteBlogDialog = () => {
    const [searchParams] = useSearchParams();
    const page = searchParams.get("page") ?? 1;
    const [isPending, startTransition] = useTransition();
    const auth = useSelector((state: RootState) => state.user.auth);
    const dispatch = useDispatch<AppDispatch>();
    const { selectedBlog } = useSelector((state: RootState) => state.blog);
    const { deleteModalOpen } = useSelector((state: RootState) => state.modal);

    function handleClose() {
        dispatch(setDeleteModal(false));
    }

    const handleOpenChange = (value: boolean) => {
        if (!value) {
            handleClose();
            dispatch(setBlog(null));
        }
    };

    async function handleSubmit() {
        startTransition(async () => {
            try {
                if (selectedBlog) {
                    await dispatch(
                        deleteBlog({
                            user_id: auth.user!.id,
                            id: selectedBlog.id,
                        })
                    ).unwrap();
                    await dispatch(getBlogs({ page: +page }));
                    dispatch(setBlogsCount(SET_BLOGS_COUNT[1]));
                    handleClose();
                    customToast({ text: "Blog successfully deleted" });
                }
            } catch (err) {
                customToast({ text: "Something went wrong", type: TOAST_TYPE[1] });
            }
        });
    }

    return (
        <Dialog open={deleteModalOpen} onOpenChange={handleOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Blog</DialogTitle>
                    <DialogDescription>Are you sure you want to delete this blog?</DialogDescription>
                </DialogHeader>

                <p className="font-bold my-4">{selectedBlog?.title}</p>
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

export default DeleteBlogDialog;
