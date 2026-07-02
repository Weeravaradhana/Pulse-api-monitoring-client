"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { usePresence } from "@/providers/PresenceProvide";

type Role = "OWNER" | "MEMBER" | "VIEWER";

interface TeamMember {
    id: string;
    name: string | null;
    email: string;
    role: Role;
}

type Props = {
    workspaceId: string;
};

export function TeamManagement({ workspaceId }: Props) {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { onlineIds } = usePresence();

    useEffect(() => {
        const fetchMembers = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get<TeamMember[]>(
                    `${process.env.NEXT_PUBLIC_API_URL}/workspaces/${workspaceId}/members`
                );
                setMembers(response.data || []);
            } catch (err: any) {
                console.error("Failed to load team members:", err);
            } finally {
                setIsLoading(false);
            }
        };

        if (workspaceId) fetchMembers();
    }, [workspaceId]);

    const getInitials = (name: string | null, email: string) => {
        const fallback = email ? email[0].toUpperCase() : "U";
        if (!name || typeof name !== "string") return fallback;
        const parts = name.trim().split(/\s+/);
        if (parts.length === 0 || parts[0] === "") return fallback;
        return parts.map(n => n[0]).join("").toUpperCase().slice(0, 2);
    };

    const onlineCount = members.filter((m) => onlineIds.has(m.id)).length;

    return (
        <div className="w-full h-95 rounded-xl bg-white p-4 sm:p-5 shadow-sm border border-slate-100 flex flex-col">
            <div className="mb-4 shrink-0">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-900">Team Members</h3>
                    {!isLoading && (
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-2xs font-medium text-slate-600">
                            {onlineCount} Online
                        </span>
                    )}
                </div>
            </div>

            {isLoading ? (
                <div className="text-xs text-slate-400">Loading team...</div>
            ) : (
                <div className="flex-1 min-h-0 overflow-y-auto pr-1">
                    <table className="w-full text-left table-fixed">
                        <tbody className="text-xs text-slate-700">
                        {members.map((m) => {
                            const isOnline = onlineIds.has(m.id);
                            return (
                                <tr key={m.id} className="border-b border-slate-50 last:border-0">
                                    <td className="py-2.5">
                                        <div className="flex items-center gap-3">
                                            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 font-semibold text-slate-600 border border-slate-200">
                                                {getInitials(m.name, m.email)}
                                                <span
                                                    className={`absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white ${
                                                        isOnline ? "bg-emerald-500" : "bg-slate-300"
                                                    }`}
                                                />
                                            </div>
                                            <div className="flex flex-col truncate">
                                                <span className="font-medium text-slate-900 truncate">{m.name || "User"}</span>
                                                <span className="text-2xs text-slate-400 truncate">{m.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}