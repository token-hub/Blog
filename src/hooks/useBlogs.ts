import { getBlogs, getBlogsCount } from "@/redux/action-creators/blogActions";
import type { RootState, AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { User } from "@supabase/supabase-js";
import { usePage } from "./usePage";
import { PAGINATION_IDENTIFIER } from "@/lib/constants";

export const useBlogs = ({ user }: { user: User | null }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { blogs, totalCount, loading } = useSelector((state: RootState) => state.blog);
    const page = usePage(PAGINATION_IDENTIFIER[0]);

    useEffect(() => {
        dispatch(getBlogsCount(user?.id));
    }, [dispatch, user?.id]);

    useEffect(() => {
        dispatch(getBlogs({ page, user_id: user?.id }));
    }, [dispatch, page, user?.id]);

    return { blogs, totalCount, loading };
};
