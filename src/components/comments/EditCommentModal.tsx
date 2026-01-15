import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import type { AppDispatch, RootState } from "@/redux/store";
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
import { useEffect } from "react";
import { commentDialogDefaultValues } from "@/lib/constants";
import { customToast } from "@/lib/utils";
import { getComments, updateComment } from "@/redux/action-creators/commentActions";
import { usePage } from "@/src/hooks/usePage";

const EditCommentModal = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { commentModalOpen } = useSelector((state: RootState) => state.modal);
    const { selectedComment } = useSelector((state: RootState) => state.comment);
    const { selectedBlog } = useSelector((state: RootState) => state.blog);
    const auth = useSelector((state: RootState) => state.user.auth);
    const page = usePage();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<z.infer<typeof commentSchema>>({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            comment: selectedComment?.comment,
        },
    });

    useEffect(() => {
        if (commentModalOpen && selectedComment) {
            reset({
                comment: selectedComment.comment,
            });
        }

        if (commentModalOpen && !selectedComment) {
            reset(commentDialogDefaultValues);
        }
    }, [commentModalOpen, selectedComment, reset]);

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
            await dispatch(
                updateComment({
                    user_id: auth.user!.id,
                    id: selectedComment?.id as string,
                    comment: data.comment,
                    image: data.image ? data.image[0] : undefined,
                })
            ).unwrap();
            await dispatch(getComments({ page, blog_id: selectedBlog?.id as string }));

            customToast({ text: "Blog successfully updated" });
            dispatch(setComment(null));
            handleClose();
        } catch (error) {
            console.log(error);
            customToast({ text: "Something went wrong" });
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
