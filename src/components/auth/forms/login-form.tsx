'use client'

import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {loginSchema, LoginSchema} from "@/validators/login.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {SuccessToast} from "@/components/auth/success-toast";
import {FormField} from "@/components/auth/form-field";
import {Loader2, Lock, Mail} from "lucide-react";
import {apiClient} from "@/lib/axios/api-client";
import {AxiosError} from "axios";
import {ApiErrorResponse} from "@/types/api-response";

export function LoginForm(){

    const router = useRouter();
    const [showToast, setShowToast] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const {
      register,
      handleSubmit,
      formState: {errors, dirtyFields}
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = async (data: LoginSchema) => {
        setIsSubmitting(true);

        try {
            const response = await apiClient.post(`/auth/login`, {
                email: data.email,
                password: data.password
            });
            if (response.status === 201 || response.status === 200){
                setShowToast(true);
                setTimeout(() => router.push(`/dashboard`), 2200);
            }
        }catch (error: unknown){
            if (error instanceof AxiosError && error.response){
                const errorData = error.response.data as ApiErrorResponse;

                if (error.response.status === 404){
                    setError("Email not found.Please register.");
                }else {
                    const serverMessage = Array.isArray(errorData.message)
                        ? errorData.message[0]
                        : errorData.message;

                    setError(serverMessage ||  "Registration failed. Try again.");
                }
            }
        }
    };


    return(
        <>
            <div className="w-full max-w-sm mx-auto">
                {showToast && (
                    <SuccessToast
                        message="Login Successful!"
                        subMessage="Redirecting to dashboard..."
                    />
                )}

                <div className="mb-6">
                    <h1 className="text-[22px] font-bold text-slate-900">
                        Sign in to your account
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Start monitoring in minutes
                    </p>
                </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
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

                <FormField
                    label="Password"
                    type="password"
                    placeholder="••••••••••"
                    leftIcon={<Lock className="w-3.5 h-3.5" />}
                    error={errors.password?.message}
                    isValid={dirtyFields.password && !errors.password}
                    {...register("password")}
                />

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0 hover:cursor-pointer"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Signing in....
                        </>
                    ) : (
                        "Log in"
                    )}
                </button>
            </form>
                <div className="flex items-center gap-3 my-4">
                    <div className="flex-1 h-px bg-slate-200" />
                    <span className="text-xs text-slate-400">or</span>
                    <div className="flex-1 h-px bg-slate-200" />
                </div>

                <p className="text-center text-xs text-slate-500">
                    Don&#39;t have an account?{" "}
                    <a href="/register" className="text-indigo-600 font-semibold hover:underline">
                        Register
                    </a>
                </p>
            </div>
        </>
    )
}