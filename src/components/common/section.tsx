import React from "react";

export function Section({
                            title,
                            children,
                        }: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <h2 className="text-sm font-semibold text-slate-800 whitespace-nowrap">
                    {title}
                </h2>
                <div className="h-px bg-slate-200 w-full" />
            </div>

            <div>{children}</div>
        </div>
    );
}