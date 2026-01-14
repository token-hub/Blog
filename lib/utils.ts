import { clsx, type ClassValue } from "clsx";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import { TOAST_TYPE } from "./constants";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function capitalizedFirstLetter(text: string) {
    if (!text) {
        return;
    }

    return text.charAt(0).toUpperCase() + text.slice(1);
}

export function transformDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export function truncateText(text: string, length: number = 200) {
    return text.slice(0, length) + "...";
}

export function customToast({ text = "", type = TOAST_TYPE[0] }: { text: string; type?: string }) {
    if (type === TOAST_TYPE[0]) {
        toast.success(text);
    }
    if (type === TOAST_TYPE[1]) {
        toast.error(text);
    }
}
