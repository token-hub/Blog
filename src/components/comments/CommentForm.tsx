import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { commentSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useForm, type SubmitHandler } from "react-hook-form";
import type z from "zod";

const Comments = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<z.infer<typeof commentSchema>>({
        resolver: zodResolver(commentSchema),
    });

    const onSubmit: SubmitHandler<z.infer<typeof commentSchema>> = async (data) => {
        try {
            console.log(data);
        } catch (error) {
            console.log(error);
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
