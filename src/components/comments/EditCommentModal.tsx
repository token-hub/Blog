import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import type { RootState } from "@/redux/store";
import { DialogClose } from "@radix-ui/react-dialog";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "@/redux/slices/modalSlice";
import { setComment } from "@/redux/slices/commentSlice";

import { Spinner } from "@/components/ui/spinner";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "@/lib/validators";
import type z from "zod";

const EditCommentModal = () => {
    const dispatch = useDispatch();
    const { commentModalOpen } = useSelector((state: RootState) => state.modal);
    const { selectedComment } = useSelector((state: RootState) => state.comment);

    const {
        register,
        handleSubmit,

        formState: { errors, isSubmitting },
    } = useForm<z.infer<typeof commentSchema>>({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            comment: selectedComment?.comment,
        },
    });

    function handleClose() {
        dispatch(resetState());
    }

    const handleOpenChange = (value: boolean) => {
        if (!value) {
            handleClose();
            dispatch(setComment(null));
        }
    };

    const onSubmit: SubmitHandler<z.infer<typeof commentSchema>> = async (data) => {
        try {
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog open={commentModalOpen} onOpenChange={handleOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Comment</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {selectedComment?.image_url && (
                        <div className="">
                            <img
                                src={selectedComment?.image_url}
                                alt={selectedComment.comment.slice(1, 20)}
                                className="w-125 h-80 object-cover rounded-xl"
                            ></img>
                        </div>
                    )}

                    <div className="mb-3">
                        <Label htmlFor="comment">
                            Comment<span className="text-red-700 mb-2">*</span>
                        </Label>
                        <Textarea {...register("comment")} className="bg-white" placeholder="Type your comment" />
                        {errors.comment && <p className="text-sm text-red-500">{errors.comment.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="title" className="mb-2">
                            Upload new Image
                        </Label>
                        <Input {...register("image")} className="bg-white" type="file" placeholder="image" />
                        {errors.image && <p className="text-sm text-red-500">{errors.image.message}</p>}
                    </div>

                    <DialogFooter className="mt-3">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </DialogClose>

                        <Button disabled={isSubmitting} type="submit" className="hover:cursor-pointer">
                            {isSubmitting && <Spinner />} Submit
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditCommentModal;
