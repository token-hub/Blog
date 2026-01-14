import { Card, CardContent } from "@/components/ui/card";
import { capitalizedFirstLetter, transformDate } from "@/lib/utils";
import type { blogType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";
import { Link } from "react-router";

const Blog = ({ id, title, created_at, blog }: blogType) => {
    return (
        <Card className="w-3/4 hover:shadow-xl hover:cursor-pointer mb-4">
            <CardContent>
                <Link to={id} className="w-full">
                    <div className="flex justify-between">
                        <h1 className="text-4xl mb-4">{capitalizedFirstLetter(title)}</h1>
                        <div className="flex gap-2">
                            <Button size="sm" type="button">
                                <Trash2 />
                            </Button>
                            <Button size="sm" type="button">
                                <Pencil />
                            </Button>
                        </div>
                    </div>
                    <p className="text-gray mb-4">{transformDate(created_at)}</p>
                    <p className="leading-6">{blog}</p>
                </Link>
            </CardContent>
        </Card>
    );
};

export default Blog;
