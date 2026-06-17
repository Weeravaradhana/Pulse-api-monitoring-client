"use client";

import { useState } from "react";

type Role = "Owner/Admin" | "Member" | "Viewer";

interface TeamMember {
    name: string;
    email: string;
    role: Role;
    isOnline: boolean;
}

const DATA: TeamMember[] = [
    /* { name: "Kasun Perera", email: "kasun@travelease.com", role: "Owner/Admin", isOnline: true },
    { name: "Nimal Silva", email: "nimal@travelease.com", role: "Member", isOnline: false },
     { name: "Dilshan Silva", email: "dilshan1@travelease.com", role: "Viewer", isOnline: true },
     { name: "Dilshan Silva", email: "dilshan2@travelease.com", role: "Viewer", isOnline: true },
     { name: "Dilshan Silva", email: "dilshan3@travelease.com", role: "Viewer", isOnline: true },
     { name: "Dilshan Silva", email: "dilshan4@travelease.com", role: "Viewer", isOnline: true },
     { name: "Dilshan Silva", email: "dilshan5@travelease.com", role: "Viewer", isOnline: true },
     { name: "Dilshan Silva", email: "dilshan6@travelease.com", role: "Viewer", isOnline: true },
     { name: "Dilshan Silva", email: "dilshan7@travelease.com", role: "Viewer", isOnline: true },*/
];

type Props = {
    id: string;
};

export function TeamManagement({ id }: Props) {
    const [members, setMembers] = useState<TeamMember[]>(DATA);

    const updateRole = (index: number, role: Role) => {
        const copy = [...members];
        copy[index].role = role;
        setMembers(copy);
    };

    return (
        <div className="rounded-xl border border-slate-200 bg-white sm:p-6 shadow-sm">
            <div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold text-slate-900">Team Access & Management</h3>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                            {members.length} Total
                        </span>
                    </div>
                    <p className="text-xs text-slate-500">View active organization members, status, and manage permission roles.</p>
                </div>
            </div>

            { DATA.length === 0 ? "No members available. Start by adding a new member" :
            <div className="w-full overflow-x-auto overflow-y-auto rounded-lg border border-slate-200 bg-white max-h-62.5 scrollbar-thin">
                <table className="w-full min-w-150 text-center border-collapse table-fixed sm:table-auto">
                    <thead className="sticky top-0 z-10 bg-slate-50 shadow-[0_1px_0_0_rgba(226,232,240,1)]">
                    <tr className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                        <th className="p-4 bg-slate-50 text-left">Member Info</th>
                        <th className="p-4 bg-slate-50">Status</th>
                        <th className="p-4 bg-slate-50 text-right">Access Role</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                    {members.map((m, i) => (
                        <tr key={m.email} className="hover:bg-slate-50/70 transition-colors">
                            <td className="p-4">
                                <div className="flex flex-col min-w-0 text-left">
                                    <span className="font-medium text-slate-900 truncate">{m.name}</span>
                                    <span className="text-xs text-slate-500 truncate">{m.email}</span>
                                </div>
                            </td>

                            <td className="p-4">
                                {m.isOnline ? (
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 border border-emerald-200">
                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            Online
                                        </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 border border-slate-200">
                                            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                                            Offline
                                        </span>
                                )}
                            </td>

                            <td className="p-4 text-right">
                                <select
                                    className="h-9 w-full sm:w-40 rounded-lg border border-slate-300 bg-white px-2.5 text-xs font-medium text-slate-700 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 hover:bg-slate-50 cursor-pointer"
                                    value={m.role}
                                    onChange={(e) => updateRole(i, e.target.value as Role)}
                                >
                                    <option value="Owner/Admin">Owner/Admin</option>
                                    <option value="Member">Member</option>
                                    <option value="Viewer">Viewer</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            }
        </div>
    );
}