export const loginDefaultValues = {
    email: "john@gmail.com",
    password: "asdasd",
};

export const registerDefaultValues = {
    email: "john@gmail.com",
    password: "asdasd",
    confirmPassword: "asdasd",
};

export const blogDialogDefaultValues = {
    title: "",
    blog: "",
};

export const TABLES = ["blogs"] as const;
export const ERROR_CODES = ["23505"];
export const ERROR_CODES_DESCRIPTION = ["A blog with this title already exists"];
export const BLOG_LIMIT = 3;
export const SET_BLOGS_COUNT = ["increment", "decrement"] as const;
export const TOAST_TYPE = ["success", "error"] as const;
