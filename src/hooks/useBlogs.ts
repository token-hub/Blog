import { getBlogs, getBlogsCount } from "@/redux/action-creators/blogActions";
import type { RootState, AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router";

import type { User } from "@supabase/supabase-js";

export const useBlogs = ({ user }: { user: User | null }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { blogs, totalCount, loading } = useSelector((state: RootState) => state.blog);
    const [searchParams] = useSearchParams();
    const page = searchParams.get("page") ?? 1;

    useEffect(() => {
        dispatch(getBlogsCount(user?.id));
    }, [dispatch, user?.id]);

    useEffect(() => {
        dispatch(getBlogs(+page));
    }, [dispatch, page]);

    return { blogs, totalCount, loading };
};
