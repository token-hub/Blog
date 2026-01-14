import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { blogDialogDefaultValues } from "@/lib/constants";
import { blogSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import type z from "zod";

import { Spinner } from "@/components/ui/spinner";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { setModal } from "@/redux/slices/modalSlice";
import { setBlog } from "@/redux/slices/blogSlice";
import { useEffect } from "react";
import { insertBlog, updateBlog } from "@/redux/action-creators/blogActions";

const CreateBlogDialog = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { open } = useSelector((state: RootState) => state.modal);
    const auth = useSelector((state: RootState) => state.user.auth);
    const { selectedBlog } = useSelector((state: RootState) => state.blog);

    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<z.infer<typeof blogSchema>>({
        resolver: zodResolver(blogSchema),
        defaultValues: blogDialogDefaultValues,
    });

    useEffect(() => {
        if (open && selectedBlog) {
            reset({
                title: selectedBlog.title,
                blog: selectedBlog.blog,
            });
        }

        if (open && !selectedBlog) {
            reset(blogDialogDefaultValues); // new blog
        }
    }, [open, selectedBlog, reset]);

    const onSubmit: SubmitHandler<z.infer<typeof blogSchema>> = async (data) => {
        try {
            if (selectedBlog) {
                await dispatch(
                    updateBlog({
                        user_id: auth.user!.id,
                        id: selectedBlog.id,
                        title: data.title,
                        blog: data.blog,
                    })
                ).unwrap();
            } else {
                await dispatch(
                    insertBlog({
                        user_id: auth.user!.id,
                        title: data.title,
                        blog: data.blog,
                    })
                ).unwrap();
            }

            handleClose();
        } catch (err) {
            if (err instanceof Error) {
                setError("root", { message: err.message });
            } else {
                setError("root", { message: "Something went wrong" });
            }
        }
    };

    function handleAdd() {
        dispatch(setModal(true));
    }

    function handleClose() {
        dispatch(setModal(false));
    }

    const handleOpenChange = (value: boolean) => {
        if (!value) {
            handleClose();
            dispatch(setBlog(null));
        }
    };

    return (
        <>
            <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogTrigger asChild>
                    <Button onClick={handleAdd}>Add</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
                        <DialogHeader>
                            <DialogTitle>Create new blog</DialogTitle>
                        </DialogHeader>

                        <div className="grid gap-2 mt-3">
                            <div>
                                <Label htmlFor="title">
                                    Title <span className="text-red-700 mb-2">*</span>
                                </Label>
                                <Input {...register("title")} type="text" placeholder="blog" />
                                {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                            </div>

                            <div>
                                <Label htmlFor="blog">
                                    Blog <span className="text-red-700 mb-2">*</span>
                                </Label>
                                <Textarea {...register("blog")} placeholder="Type your message blog." />
                                {errors.blog && <p className="text-sm text-red-500">{errors.blog.message}</p>}
                            </div>

                            {errors.root && <div className="text-sm text-destructive">{errors.root.message}</div>}
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
        </>
    );
};

export default CreateBlogDialog;
