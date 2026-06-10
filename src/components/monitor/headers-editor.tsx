"use client";

import { useFieldArray, Control, FieldErrors } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { CreateMonitorFormSchema } from "@/validators/create-monitor.schema";
import { cn } from "@/lib/utils";

interface HeadersEditorProps {
    control: Control<CreateMonitorFormSchema>;
    errors:  FieldErrors<CreateMonitorFormSchema>;
}

export function HeadersEditor({ control, errors }: HeadersEditorProps) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "headers",
    });

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Request Headers
                    <span className="ml-1.5 text-[10px] font-medium text-slate-400 dark:text-slate-500">
            (optional)
          </span>
                </p>
                <button
                    type="button"
                    onClick={() => append({ id: crypto.randomUUID(), key: "", value: "" })}
                    className="flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-xs font-semibold transition-all
            bg-indigo-50 dark:bg-indigo-500/10
            text-indigo-600 dark:text-indigo-400
            border border-indigo-200 dark:border-indigo-500/20
            hover:bg-indigo-100 dark:hover:bg-indigo-500/20"
                >
                    <Plus className="w-3 h-3" />
                    Add Header
                </button>
            </div>

            {fields.length === 0 ? (
                <div className="flex items-center justify-center h-14 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                        No headers added — click &quot;Add Header&quot; to add one
                    </p>
                </div>
            ) : (
                <div className="space-y-2">
                    <div className="grid grid-cols-[1fr_1fr_32px] gap-2 px-1">
                        <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Key</span>
                        <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Value</span>
                    </div>

                    {fields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-[1fr_1fr_32px] gap-2 items-start">
                            {/* Key */}
                            <div>
                                <input
                                    {...control.register(`headers.${index}.key`)}
                                    placeholder="Authorization"
                                    className={cn(
                                        "w-full h-9 rounded-lg border text-sm px-3 transition-all outline-none",
                                        "bg-slate-50 dark:bg-slate-800/60",
                                        "text-slate-800 dark:text-slate-200",
                                        "placeholder:text-slate-400 dark:placeholder:text-slate-500",
                                        errors.headers?.[index]?.key
                                            ? "border-rose-400 dark:border-rose-500"
                                            : "border-slate-200 dark:border-slate-700 focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/10"
                                    )}
                                />
                                {errors.headers?.[index]?.key && (
                                    <p className="text-[10px] text-rose-500 mt-0.5">
                                        {errors.headers[index]?.key?.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <input
                                    {...control.register(`headers.${index}.value`)}
                                    placeholder="Bearer token..."
                                    className={cn(
                                        "w-full h-9 rounded-lg border text-sm px-3 transition-all outline-none",
                                        "bg-slate-50 dark:bg-slate-800/60",
                                        "text-slate-800 dark:text-slate-200",
                                        "placeholder:text-slate-400 dark:placeholder:text-slate-500",
                                        "border-slate-200 dark:border-slate-700 focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/10"
                                    )}
                                />
                            </div>

                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="w-8 h-9 flex items-center justify-center rounded-lg transition-all
                  bg-slate-100 dark:bg-slate-800
                  text-slate-400 hover:text-rose-500 dark:hover:text-rose-400
                  hover:bg-rose-50 dark:hover:bg-rose-500/10
                  border border-slate-200 dark:border-slate-700"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}