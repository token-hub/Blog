import { clsx, type ClassValue } from "clsx";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import { CLOUD_NAME, TOAST_TYPE } from "./constants";

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

export async function uploadImageToClaudinary(image?: File) {
    if (image) {
        let image_url: string = "";
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "iblog_");
        formData.append("cloud_name", CLOUD_NAME);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

        if (res.ok) {
            image_url = data.url;
        } else {
            throw new Error(data.error || "Something went wrong");
        }

        return image_url || null;
    }
}
