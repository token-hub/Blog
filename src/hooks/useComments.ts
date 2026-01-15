import { PAGINATION_IDENTIFIER } from "@/lib/constants";
import { getCommentCount, getComments } from "@/redux/action-creators/commentActions";
import type { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePage } from "./usePage";
import type { blogType } from "@/lib/types";

export const useComments = ({ selectedBlog }: { selectedBlog: blogType | null }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { comments, loading, totalCount } = useSelector((state: RootState) => state.comment);
    const page = usePage(PAGINATION_IDENTIFIER[1]);

    useEffect(() => {
        if (selectedBlog?.id) {
            dispatch(getCommentCount(selectedBlog?.id));
        }
    }, [dispatch, selectedBlog?.id]);

    useEffect(() => {
        if (selectedBlog?.id) {
            dispatch(getComments({ page: +page, blog_id: selectedBlog?.id }));
        }
    }, [dispatch, page, selectedBlog?.id]);

    return { comments, loading, totalCount };
};
