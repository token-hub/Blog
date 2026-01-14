import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { BLOG_LIMIT } from "@/lib/constants";
import type { paginationType } from "@/lib/types";
import { useSearchParams } from "react-router";

const BlogPagination = ({ totalCount = 0 }: paginationType) => {
    const [searchParams] = useSearchParams();
    const page = searchParams.get("page") ?? 1;
    const totalPage = Math.ceil(totalCount / BLOG_LIMIT);

    const previousPage = +page - 1 > 0 ? `?page=${+page - 1}` : `?page=1`;
    const nextPage = +page + 1 < totalPage ? `?page=${+page + 1}` : `?page=${totalPage}`;

    return (
        <>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious to={previousPage} />
                    </PaginationItem>
                    {totalCount > 1 &&
                        Array.from({ length: totalPage }).map((_, index) => {
                            const isActive = page ? +page === index + 1 : false;
                            return (
                                <PaginationItem key={index}>
                                    <PaginationLink to={`?page=${index + 1}`} isActive={isActive}>
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        })}
                    <PaginationItem>
                        <PaginationNext to={nextPage} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    );
};

export default BlogPagination;
