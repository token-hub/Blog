import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { setBlog } from "@/redux/slices/blogSlice";
import { setDeleteModal } from "@/redux/slices/modalSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { DialogClose } from "@radix-ui/react-dialog";
import { useDispatch, useSelector } from "react-redux";

const DeleteBlogDialog = () => {
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
        // todo
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

                    <Button disabled={false} onClick={handleSubmit} type="submit" className="hover:cursor-pointer">
                        {false && <Spinner />} Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteBlogDialog;
