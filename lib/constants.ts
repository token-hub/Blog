const email = import.meta.env.VITE_EMAIL;
const password = import.meta.env.VITE_PASSWORD;

export const loginDefaultValues = {
    email: email || "",
    password: password || "",
};

export const registerDefaultValues = {
    email: "",
    password: "",
    confirmPassword: "",
};

export const blogDialogDefaultValues = {
    title: "",
    blog: "",
};

export const commentDialogDefaultValues = {
    comment: "",
};

export const TABLES = ["blogs", "comments"] as const;
export const ERROR_CODES = ["23505"];
export const ERROR_CODES_DESCRIPTION = ["A blog with this title already exists"];
export const BLOG_LIMIT = 3;
export const COMMENT_LIMIT = 3;
export const SET_BLOGS_COUNT = ["increment", "decrement"] as const;
export const TOAST_TYPE = ["success", "error"] as const;

export const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_NAME;
