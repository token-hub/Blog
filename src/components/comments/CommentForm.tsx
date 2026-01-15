import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { customToast } from "@/lib/utils";
import { commentSchema } from "@/lib/validators";
import { createComment } from "@/redux/action-creators/commentActions";
import type { AppDispatch, RootState } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import type z from "zod";

const Comments = () => {
    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.user.auth);
    const { selectedBlog } = useSelector((state: RootState) => state.blog);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<z.infer<typeof commentSchema>>({
        resolver: zodResolver(commentSchema),
    });

    const onSubmit: SubmitHandler<z.infer<typeof commentSchema>> = async (data) => {
        try {
            await dispatch(
                createComment({
                    comment: data.comment,
                    image: data.image ? data.image[0] : undefined,
                    user_id: auth.user?.id as string,
                    blog_id: selectedBlog?.id as string,
                })
            );
        } catch (error) {
            customToast({ text: "Something went wrong" });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Label htmlFor="comment">
                    Comment<span className="text-red-700 mb-2">*</span>
                </Label>
                <Textarea {...register("comment")} placeholder="Type your comment" />
                {errors.comment && <p className="text-sm text-red-500">{errors.comment.message}</p>}
            </div>

            <div>
                <Label htmlFor="title" className="mb-2">
                    Image
                </Label>
                <Input {...register("image")} type="file" placeholder="image" />
                {errors.image && <p className="text-sm text-red-500">{errors.image.message}</p>}
            </div>

            <div className="flex justify-end">
                <Button disabled={isSubmitting} type="submit" className="hover:cursor-pointer mt-2">
                    {isSubmitting && <Spinner />} Submit
                </Button>
            </div>
        </form>
    );
};

export default Comments;
