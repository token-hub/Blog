import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { blogDialogDefaultValues, ERROR_CODES, ERROR_CODES_DESCRIPTION } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import { blogSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import type z from "zod";
import { TABLES } from "@/lib/constants";
import { Spinner } from "@/components/ui/spinner";
import { useRef } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

const CreateBlogDialog = () => {
    const closeRef = useRef<HTMLButtonElement>(null);
    const auth = useSelector((state: RootState) => state.user.auth);
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<z.infer<typeof blogSchema>>({
        resolver: zodResolver(blogSchema),
        defaultValues: blogDialogDefaultValues,
    });

    const onSubmit: SubmitHandler<z.infer<typeof blogSchema>> = async (fields) => {
        try {
            const { error } = await supabase.from(TABLES[0]).insert({
                title: fields.title,
                blog: fields.blog,
                user_id: auth.user?.id,
            });

            if (error) {
                if (error.code === ERROR_CODES[0]) {
                    throw new Error(ERROR_CODES_DESCRIPTION[0]);
                } else {
                    throw new Error(error.message);
                }
            }

            if (closeRef.current) {
                closeRef.current.click();
            }
        } catch (err) {
            if (err instanceof Error) {
                setError("root", { message: err.message });
            } else {
                setError("root", { message: "Something went wrong" });
            }
        }
    };

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Add</Button>
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
                                <Button type="button" variant="secondary" ref={closeRef}>
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
