"use client";

import { useState } from "react";
import { Card } from "../common/card";

type Role = "Owner/Admin" | "Member" | "Viewer";

const DATA = [
    { id: 1, name: "Kasun Perera", email: "kasun@travelease.com", role: "Owner/Admin" as Role },
    { id: 2, name: "Nimal Silva", email: "nimal@travelease.com", role: "Member" as Role },
];

export function GroupTable() {
    const [members] = useState(DATA);

    return (
        <Card>

            <h3 className="text-sm font-semibold mb-4">Members</h3>

            <div className="space-y-3">
                {members.map((m) => (
                    <div
                        key={m.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3"
                    >
                        <div>
                            <p className="text-sm font-medium">{m.name}</p>
                            <p className="text-xs text-slate-500">{m.email}</p>
                        </div>

                        <span className="text-xs px-2 py-1 bg-slate-100 rounded">
              {m.role}
            </span>
                    </div>
                ))}
            </div>

        </Card>
    );
}