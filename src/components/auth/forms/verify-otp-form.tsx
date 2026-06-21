'use client'

import {useRouter, useSearchParams} from "next/navigation";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {SuccessToast} from "@/components/auth/success-toast";
import {FormField} from "@/components/auth/form-field";
import {ChevronLeft, KeyRound, Loader2} from "lucide-react";
import {VerifyOtpSchema, verifyOtpSchema} from "@/validators/verify-otp";
import Cookies from 'js-cookie';
import {apiClient} from "@/lib/axios/api-client";

export function VerifyOtpForm(){

    const router = useRouter();
    const searchParam  =useSearchParams();
    const [showToast, setShowToast] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
      register,
      handleSubmit,
      formState: {errors, dirtyFields}
    } = useForm<VerifyOtpSchema>({
        resolver: zodResolver(verifyOtpSchema),
        mode: 'onChange',
        defaultValues: {
           otp: ""
        }
    });

    const onSubmit = async (data: VerifyOtpSchema) => {
        setIsSubmitting(true);
        const userId = searchParam.get("userId");
    await apiClient.post('/auth/verify-otp', {
            otp: data.otp,
            userId
        })
        Cookies.remove("registration_intent\", { path: \"/\" }")
        await new Promise((r) => setTimeout(r, 1800));
        setShowToast(true);
        setTimeout(() => router.push(`/login`), 2200);
    };


    return(
        <>
            <div className="w-full max-w-sm mx-auto">
                {showToast && (
                    <SuccessToast
                        message="Verify Successful!"
                        subMessage="Redirecting to login page..."
                    />
                )}

                <div className="mb-6">
                    <h1 className="text-[22px] font-bold text-slate-900 text-center">
                        Verify your email
                    </h1>
                    <p className="text-sm text-slate-500 mt-1 text-center">
                        We send a 6-digit verification code to your email address.<br/>
                        Please enter it below.
                    </p>
                </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                <FormField
                    label="OTP"
                    type="text"
                    leftIcon={<KeyRound className="w-3.5 h-3.5" />}
                    error={errors.otp?.message}
                    isValid={dirtyFields.otp && !errors.otp}
                    {...register("otp")}
                />

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0 hover:cursor-pointer"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Verifying....
                        </>
                    ) : (
                        "Verify code"
                    )}
                </button>
            </form>
                <div className="flex items-center gap-3 my-4">
                    <div className="flex-1 h-px bg-slate-200" />
                    <span className="text-xs text-slate-400">or</span>
                    <div className="flex-1 h-px bg-slate-200" />
                </div>

                <p className="text-center text-xs text-slate-500 flex justify-center items-center h-7">
                    <ChevronLeft className="w-3.5 h-3.5"/>
                    <a href="/login">
                         Back to Register
                    </a>
                </p>
            </div>
        </>
    )
}