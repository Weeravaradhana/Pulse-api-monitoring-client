export interface RegisterFormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
}

export type PasswordStrength = "weak" | "fair" | "good" | "strong" | null;