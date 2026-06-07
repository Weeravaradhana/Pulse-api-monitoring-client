"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { User, Mail, Lock, Loader2 } from "lucide-react";
import { registerSchema, RegisterSchema } from "@/validators/register.schema";
import { FormField } from "../form-field";
import { PasswordStrengthMeter } from "../password-strength";
import { SuccessToast } from "../success-toast";
import Cookies from 'js-cookie';

export function RegisterForm() {
    const router = useRouter();
    const [showToast, setShowToast] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors, dirtyFields },
    } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        mode: "onChange",
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            terms: true,
        }
    });

    const passwordValue = watch("password", "");

    const onSubmit = async () => {
        setIsSubmitting(true);
        Cookies.set("registration_intent", "true", { expires: 1/288, sameSite: "strict" })
        await new Promise((r) => setTimeout(r, 1800));
        setShowToast(true);
        setTimeout(() => router.push("/verify-otp"), 2200);
    };

    return (
        <div className="w-full max-w-sm mx-auto">
            {showToast && (
                <SuccessToast
                    message="Account created!"
                    subMessage="Redirecting to verification..."
                />
            )}

            <div className="mb-6">
                <h1 className="text-[22px] font-bold text-slate-900">
                    Create your account
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    Start monitoring in minutes
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    <FormField
                        label="First Name"
                        placeholder="Jordan"
                        leftIcon={<User className="w-3.5 h-3.5" />}
                        error={errors.firstName?.message}
                        isValid={dirtyFields.firstName && !errors.firstName}
                        hint={dirtyFields.firstName && !errors.firstName ? "Looks good" : undefined}
                        {...register("firstName")}
                    />
                    <FormField
                        label="Last Name"
                        placeholder="Reyes"
                        leftIcon={<User className="w-3.5 h-3.5" />}
                        error={errors.lastName?.message}
                        isValid={dirtyFields.lastName && !errors.lastName}
                        hint={dirtyFields.lastName && !errors.lastName ? "Looks good" : undefined}
                        {...register("lastName")}
                    />
                </div>

                <FormField
                    label="Email"
                    type="email"
                    placeholder="jordan@company.com"
                    leftIcon={<Mail className="w-3.5 h-3.5" />}
                    error={errors.email?.message}
                    isValid={dirtyFields.email && !errors.email}
                    hint={dirtyFields.email && !errors.email ? "Valid email address" : undefined}
                    {...register("email")}
                />

                <div>
                    <FormField
                        label="Password"
                        isPassword
                        placeholder="••••••••••"
                        leftIcon={<Lock className="w-3.5 h-3.5" />}
                        error={errors.password?.message}
                        isValid={dirtyFields.password && !errors.password}
                        {...register("password")}
                    />
                    <PasswordStrengthMeter password={passwordValue} />
                </div>

                <FormField
                    label="Confirm Password"
                    isPassword
                    placeholder="••••••••••"
                    leftIcon={<Lock className="w-3.5 h-3.5" />}
                    error={errors.confirmPassword?.message}
                    isValid={dirtyFields.confirmPassword && !errors.confirmPassword}
                    hint={dirtyFields.confirmPassword && !errors.confirmPassword ? "Passwords match" : undefined}
                    {...register("confirmPassword")}
                />

                <div className="flex items-start gap-2.5 pt-1">
                    <Controller
                        name="terms"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="checkbox"
                                id="terms"
                                checked={field.value}
                                onChange={(e) => field.onChange(e.target.checked)}
                                className="mt-0.5 w-4 h-4 accent-indigo-600 cursor-pointer shrink-0"
                            />
                        )}
                    />
                    <label
                        htmlFor="terms"
                        className="text-xs text-slate-500 leading-relaxed cursor-pointer"
                    >
                        I agree to the{" "}
                        <a href="#" className="text-indigo-600 font-medium hover:underline">
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-indigo-600 font-medium hover:underline">
                            Privacy Policy
                        </a>
                    </label>
                </div>
                {errors.terms && (
                    <p className="text-xs text-rose-500 -mt-2">{errors.terms.message}</p>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Creating account...
                        </>
                    ) : (
                        "Create Account"
                    )}
                </button>
            </form>

            <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-xs text-slate-400">or</span>
                <div className="flex-1 h-px bg-slate-200" />
            </div>

            <p className="text-center text-xs text-slate-500">
                Already have an account?{" "}
                <a href="/login" className="text-indigo-600 font-semibold hover:underline">
                    Sign in
                </a>
            </p>
        </div>
    );
}