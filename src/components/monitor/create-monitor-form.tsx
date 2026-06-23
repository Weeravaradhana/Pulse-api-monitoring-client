"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
    Globe, Tag, Clock, Timer,
    Code2, Loader2, CheckCircle2, ArrowLeft,
    FlaskConical,
} from "lucide-react";

import {
    createMonitorFormSchema,
    CreateMonitorFormSchema,
    toCreateMonitorDto,
} from "@/validators/create-monitor.schema";
import { HttpMethod } from "@/types/monitor.types";
import { FormField, FormSelect, FormTextarea } from "@/components/common/form-field";
import { HeadersEditor } from "@/components/monitor/headers-editor";
import { MonitorSummaryCard } from "@/components/monitor/monitor-summary-card";
import axios from "axios";

const HTTP_METHODS = Object.values(HttpMethod);

const INTERVAL_PRESETS = [
    { label: "10s",  value: 10  },
    { label: "30s",  value: 30  },
    { label: "1m",   value: 60  },
    { label: "5m",   value: 300 },
    { label: "15m",  value: 900 },
];

function Section({ title, description, children }: {
    title: string; description?: string; children: React.ReactNode;
}) {
    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
            <div className="mb-4">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">{title}</h3>
                {description && (
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{description}</p>
                )}
            </div>
            <div className="space-y-4">{children}</div>
        </div>
    );
}

export function CreateMonitorForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isTesting,    setIsTesting]    = useState(false);
    const [testResult,   setTestResult]   = useState<"success" | "error" | null>(null);
    const [success,      setSuccess]      = useState(false);

    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, dirtyFields },
    } = useForm<CreateMonitorFormSchema>({
        resolver: zodResolver(createMonitorFormSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            url: "",
            method:   HttpMethod.GET,
            interval: 60,
            timeout:  30,
            headers:  [],
            body:     "",
        },
    });

    const watchedValues = useWatch({ control });
    const watchedMethod = watch("method");
    const showBody = ["POST", "PUT", "PATCH"].includes(watchedMethod);

    const handleTest = async () => {
        const url = watch("url");
        if (!url) return;
        setIsTesting(true);
        setTestResult(null);
        await new Promise((r) => setTimeout(r, 1500));
        setTestResult(Math.random() > 0.3 ? "success" : "error");
        setIsTesting(false);
    };

    const onSubmit = async (data: CreateMonitorFormSchema) => {
        setIsSubmitting(true);
        try {
            const dto = toCreateMonitorDto(data);
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/monitors`, dto, {
                withCredentials: true,
            });

            setSuccess(true);
            setTimeout(() => router.push("/dashboard"), 1500);
        } catch (error) {
            console.error("Monitor creation failed:", error);
            alert("Monitor creation failed.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </div>
                <div className="text-center">
                    <p className="text-lg font-bold text-slate-800 dark:text-slate-100">Monitor created!</p>
                    <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Redirecting to dashboard…</p>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5">

                <div className="space-y-4">

                    <Section title="Basic Information" description="Name this monitor and define the target endpoint">
                        <FormField
                            label="Monitor Name"
                            placeholder="API Gateway — Health Check"
                            leftIcon={<Tag className="w-3.5 h-3.5" />}
                            required
                            error={errors.name?.message}
                            isValid={dirtyFields.name && !errors.name}
                            hint="Give it a clear, descriptive name"
                            {...register("name")}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-3 items-end">
                            <FormSelect
                                label="Method"
                                required
                                error={errors.method?.message}
                                style={{ width: "110px" }}
                                {...register("method")}
                            >
                                {HTTP_METHODS.map((m) => (
                                    <option key={m} value={m}>{m}</option>
                                ))}
                            </FormSelect>

                            <div className="space-y-1.5">
                                <label className="flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                                    Target URL <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative flex gap-2">
                                    <div className="relative flex-1">
                                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                                        <input
                                            {...register("url")}
                                            type="url"
                                            placeholder="https://api.example.com/health"
                                            className={`w-full h-10 rounded-lg border text-sm pl-9 pr-3 transition-all outline-none
                        bg-slate-50 dark:bg-slate-800/60
                        text-slate-800 dark:text-slate-200
                        placeholder:text-slate-400 dark:placeholder:text-slate-500
                        ${errors.url
                                                ? "border-rose-400 dark:border-rose-500 focus:ring-2 focus:ring-rose-400/10"
                                                : dirtyFields.url && !errors.url
                                                    ? "border-emerald-400 dark:border-emerald-500 focus:ring-2 focus:ring-emerald-400/10"
                                                    : "border-slate-200 dark:border-slate-700 focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/10"
                                            }`}
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleTest}
                                        disabled={isTesting || !watch("url")}
                                        className={`shrink-0 flex items-center gap-1.5 h-10 px-3 rounded-lg border text-xs font-semibold transition-all
                      disabled:opacity-40 disabled:cursor-not-allowed
                      ${testResult === "success"
                                            ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                                            : testResult === "error"
                                                ? "bg-rose-50 dark:bg-rose-500/10 border-rose-300 dark:border-rose-500/30 text-rose-600 dark:text-rose-400"
                                                : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600"
                                        }`}
                                    >
                                        {isTesting ? (
                                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                        ) : testResult === "success" ? (
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                        ) : (
                                            <FlaskConical className="w-3.5 h-3.5" />
                                        )}
                                        <span className="hidden sm:inline">
                      {isTesting ? "Testing…" : testResult === "success" ? "Reachable" : testResult === "error" ? "Unreachable" : "Test"}
                    </span>
                                    </button>
                                </div>
                                {errors.url && (
                                    <p className="flex items-center gap-1 text-xs text-rose-500">
                                        <span className="w-3.5 h-3.5 rounded-full bg-rose-100 dark:bg-rose-500/10 inline-flex items-center justify-center font-bold text-[9px]">✕</span>
                                        {errors.url.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </Section>

                    <Section title="Timing" description="How often to check and when to consider a check failed">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                                    <Clock className="w-3 h-3" /> Check Interval <span className="text-rose-500">*</span>
                                </label>
                                {/* Presets */}
                                <div className="flex flex-wrap gap-1.5 mb-2">
                                    {INTERVAL_PRESETS.map(({ label, value }) => (
                                        <button
                                            key={value}
                                            type="button"
                                            onClick={() => setValue("interval", value, { shouldValidate: true })}
                                            className={`h-7 px-2.5 rounded-lg text-xs font-semibold border transition-all
                        ${watch("interval") === value
                                                ? "bg-indigo-600 text-white border-indigo-500 shadow-sm shadow-indigo-500/20"
                                                : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-700 dark:hover:text-slate-200"
                                            }`}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                                <FormField
                                    label=""
                                    type="number"
                                    placeholder="60"
                                    leftIcon={<Clock className="w-3.5 h-3.5" />}
                                    hint="Seconds between checks (min 10)"
                                    error={errors.interval?.message}
                                    {...register("interval", { valueAsNumber: true })}
                                />
                            </div>

                            <FormField
                                label="Timeout"
                                type="number"
                                placeholder="30"
                                required
                                leftIcon={<Timer className="w-3.5 h-3.5" />}
                                hint="Mark as failed after this many seconds (1–60)"
                                error={errors.timeout?.message}
                                isValid={dirtyFields.timeout && !errors.timeout}
                                {...register("timeout", { valueAsNumber: true })}
                            />
                        </div>
                    </Section>

                    <Section title="Headers" description="Custom HTTP request headers sent with every check">
                        <HeadersEditor control={control} errors={errors} />
                    </Section>

                    {showBody && (
                        <Section title="Request Body" description="JSON or text body sent with the request">
                            <FormTextarea
                                label="Body"
                                placeholder={'{\n  "key": "value"\n}'}
                                rows={6}
                                hint="Raw request body — typically JSON"
                                error={errors.body?.message}
                                {...register("body")}
                            />
                        </Section>
                    )}

                    <div className="flex items-center gap-3 pt-1 pb-6">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="flex items-center gap-2 h-10 px-4 rounded-xl border text-sm font-semibold transition-all
                bg-white dark:bg-slate-900
                border-slate-200 dark:border-slate-700
                text-slate-600 dark:text-slate-400
                hover:border-slate-300 dark:hover:border-slate-600
                hover:text-slate-800 dark:hover:text-slate-200"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold transition-all
                bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700
                text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30
                disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> Creating…</>
                            ) : (
                                <><Code2 className="w-4 h-4" /> Create Monitor</>
                            )}
                        </button>
                    </div>
                </div>

                <div>
                    <MonitorSummaryCard
                        name={watchedValues.name ?? ""}
                        url={watchedValues.url ?? ""}
                        method={(watchedValues.method as HttpMethod) ?? HttpMethod.GET}
                        interval={watchedValues.interval ?? 60}
                        timeout={watchedValues.timeout ?? 30}
                        headerCount={watchedValues.headers?.length ?? 0}
                        hasBody={Boolean(watchedValues.body?.trim())}
                    />
                </div>
            </div>
        </form>
    );
}