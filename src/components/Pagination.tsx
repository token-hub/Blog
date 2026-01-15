import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { BLOG_LIMIT, COMMENT_LIMIT } from "@/lib/constants";
import type { paginationType } from "@/lib/types";
import { useSearchParams } from "react-router";

const BlogPagination = ({ totalCount = 0, identifier = "page" }: paginationType) => {
    const [searchParams] = useSearchParams();
    const page = searchParams.get(identifier) ?? 1;
    const totalPage = Math.ceil(totalCount / (identifier == "page" ? BLOG_LIMIT : COMMENT_LIMIT));

    const previousPage = +page - 1 > 0 ? `?${identifier}=${+page - 1}` : `?${identifier}=1`;
    const nextPage = +page + 1 < totalPage ? `?${identifier}=${+page + 1}` : `?${identifier}=${totalPage}`;

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
                                    <PaginationLink to={`?${identifier}=${index + 1}`} isActive={isActive}>
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
