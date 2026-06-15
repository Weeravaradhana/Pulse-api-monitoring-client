"use client";

import { useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Card } from "../common/card";
import { Input } from "../common/input";
import { Button } from "../common/button";

export function PersonalDetailsCard() {
    const [firstName, setFirstName] = useState("Kasun");
    const [lastName, setLastName] = useState("Perera");
    const [email] = useState("kasun@travelease.com");
    const [preview, setPreview] = useState<string | null>(null);

    const inputRef = useRef<HTMLInputElement | null>(null);

    return (
        <Card>

            <h3 className="text-sm font-semibold mb-4">Profile</h3>

            {/* Avatar */}
            <div className="flex items-center gap-4 mb-4">
                <div
                    onClick={() => inputRef.current?.click()}
                    className="w-14 h-14 rounded-full bg-slate-100 overflow-hidden cursor-pointer"
                >
                    {preview ? (
                        <img src={preview} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center font-bold text-slate-500">
                            KP
                        </div>
                    )}
                </div>

                <Button variant="secondary" onClick={() => inputRef.current?.click()}>
                    Upload
                </Button>

                <input
                    ref={inputRef}
                    type="file"
                    hidden
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setPreview(URL.createObjectURL(file));
                    }}
                />
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>

            {/* Email */}
            <div className="relative mb-4">
                <Input value={email} readOnly className="bg-slate-50" />
                <span className="absolute right-3 top-2 text-xs text-green-600 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> Verified
        </span>
            </div>

            <Button className="w-full">Save Profile</Button>

        </Card>
    );
}