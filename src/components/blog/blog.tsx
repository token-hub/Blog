import { Card, CardContent } from "@/components/ui/card";
import { capitalizedFirstLetter, transformDate } from "@/lib/utils";
import type { blogType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";
import { Link } from "react-router";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const Blog = ({ id, title, created_at, blog, user_id }: blogType) => {
    const { auth } = useSelector((state: RootState) => state.user);
    const isOwner = user_id === auth.user?.id;

    console.log({ isOwner }, auth, user_id);
    return (
        <Card className="w-3/4 hover:shadow-xl hover:cursor-pointer mb-4">
            <CardContent>
                <Link to={id} className="w-full">
                    <div className="flex justify-between">
                        <h1 className="text-4xl mb-4">{capitalizedFirstLetter(title)}</h1>
                    </div>
                    <p className="text-gray mb-4">{transformDate(created_at)}</p>
                    <p className="leading-6">{blog}</p>
                </Link>
                {isOwner && (
                    <div className="flex gap-2 justify-end mt-2">
                        <Button size="sm" type="button">
                            <Trash2 />
                        </Button>
                        <Button size="sm" type="button">
                            <Pencil />
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default Blog;
