import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = loginSchema
    .extend({
        confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export const blogSchema = z.object({
    title: z.string().nonempty("Title is required"),
    blog: z.string().nonempty("Blog content is required"),
    image: z.custom<FileList>().optional(),
});

export const commentSchema = z.object({
    comment: z.string().nonempty("Comment is required"),
    image: z.custom<FileList>().optional(),
});
