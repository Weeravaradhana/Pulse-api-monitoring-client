"use client";

import { useState } from "react";
import { Card } from "../common/card";

type Role = "Owner/Admin" | "Member" | "Viewer";

const DATA = [
    { name: "Kasun", email: "kasun@travelease.com", role: "Owner/Admin" as Role },
    { name: "Nimal", email: "nimal@travelease.com", role: "Member" as Role },
];

export function GroupManagement() {
    const [members, setMembers] = useState(DATA);

    const update = (i: number, role: Role) => {
        const copy = [...members];
        copy[i].role = role;
        setMembers(copy);
    };

    return (
        <Card>

            <h3 className="text-sm font-semibold mb-4">Team Access</h3>

            <div className="space-y-3">
                {members.map((m, i) => (
                    <div
                        key={m.email}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border p-3 rounded-lg"
                    >
                        <div>
                            <p className="text-sm font-medium">{m.name}</p>
                            <p className="text-xs text-slate-500">{m.email}</p>
                        </div>

                        <select
                            className="h-9 border rounded-lg px-2 text-xs w-full sm:w-40"
                            value={m.role}
                            onChange={(e) => update(i, e.target.value as Role)}
                        >
                            <option>Owner/Admin</option>
                            <option>Member</option>
                            <option>Viewer</option>
                        </select>
                    </div>
                ))}
            </div>

        </Card>
    );
}