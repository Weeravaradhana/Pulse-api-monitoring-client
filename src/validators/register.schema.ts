import { z } from "zod";

export const registerSchema = z
    .object({
        firstName: z
            .string()
            .trim()
            .min(2, "First name must be at least 2 characters")
            .max(50, "First name is too long"),
        lastName: z
            .string()
            .trim()
            .min(2, "Last name must be at least 2 characters")
            .max(50, "Last name is too long"),
        email: z
            .string()
            .trim()
            .toLowerCase()
            .email("Please enter a valid email address"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Must contain at least one uppercase letter")
            .regex(/[0-9]/, "Must contain at least one number")
            .regex(/[@$!%*?&._-]/, "Must contain at least one special character"),
        confirmPassword: z
            .string()
            .min(1, "Confirm password is required"),
        terms: z.literal(true, {
            message: "You must accept the terms",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type RegisterSchema = z.infer<typeof registerSchema>;