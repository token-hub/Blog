import { useSearchParams } from "react-router";

export const usePage = (text = "page") => {
    const [searchParams] = useSearchParams();
    const page = searchParams.get(text) ?? 1;

    return +page;
};
