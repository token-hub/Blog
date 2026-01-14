import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
