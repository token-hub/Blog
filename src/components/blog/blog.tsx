import { Card, CardContent } from "@/components/ui/card";
import { capitalizedFirstLetter, transformDate } from "@/lib/utils";
import type { blogType } from "@/lib/types";

const Blog = ({ title, created_at, blog }: blogType) => {
    return (
        <Card className="w-3/4 hover:shadow-xl hover:cursor-pointer mb-4">
            <CardContent>
                <h1 className="text-4xl mb-4">{capitalizedFirstLetter(title)}</h1>
                <p className="text-gray mb-4">{transformDate(created_at)}</p>
                <p className="leading-6">{blog}</p>
            </CardContent>
        </Card>
    );
};

export default Blog;
