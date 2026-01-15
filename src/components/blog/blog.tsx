import { Card, CardContent } from "@/components/ui/card";
import { capitalizedFirstLetter, transformDate, truncateText } from "@/lib/utils";
import type { blogType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";
import { Link, useLocation } from "react-router";
import type { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setBlog } from "@/redux/slices/blogSlice";
import { setModal, setDeleteModal } from "@/redux/slices/modalSlice";

const Blog = ({ id, title, created_at, blog, user_id, image_url }: blogType) => {
    const dispatch = useDispatch<AppDispatch>();
    const { auth } = useSelector((state: RootState) => state.user);
    const isOwner = user_id === auth.user?.id;
    const imageToUse = image_url ?? "https://placehold.co/160x240?text=default";
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    function handleSetBlog() {
        dispatch(
            setBlog({
                id,
                title,
                created_at,
                blog,
                user_id,
                image_url,
            })
        );
    }

    function handleEdit() {
        handleSetBlog();
        dispatch(setModal(true));
    }

    function handleDelete() {
        handleSetBlog();
        dispatch(setDeleteModal(true));
    }

    return (
        <Card className="w-3/4 hover:shadow-xl hover:cursor-pointer mb-4">
            <CardContent>
                <Link to={id} className="w-full">
                    <div className="flex">
                        <div className="shrink-0 flex items-center">
                            <img src={imageToUse} alt={title} className="w-60 h-40 object-cover rounded"></img>
                        </div>
                        <div className="ml-4">
                            <div className="flex justify-between">
                                <h1 className="text-4xl mb-4">{capitalizedFirstLetter(title)}</h1>
                            </div>
                            <p className="text-gray mb-4">{transformDate(created_at)}</p>
                            <p className="leading-6"> {truncateText(blog)}</p>
                        </div>
                    </div>
                </Link>
                {isOwner && !isHomePage && (
                    <div className="flex gap-2 justify-end mt-2">
                        <Button size="sm" type="button" onClick={handleDelete}>
                            <Trash2 />
                        </Button>
                        <Button size="sm" type="button" onClick={handleEdit}>
                            <Pencil />
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default Blog;
