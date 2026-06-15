"use client";

import { useState } from "react";
import { Card } from "../common/card";
import { Input } from "../common/input";
import { Button } from "../common/button";

export function WorkspaceSetupCard() {
    const [org, setOrg] = useState("TravelEase");
    const [slug, setSlug] = useState("");

    return (
        <Card>

            <h3 className="text-sm font-semibold mb-4">Workspace</h3>

            <div className="space-y-3">
                <Input value={org} onChange={(e) => setOrg(e.target.value)} />

                <Input
                    value={slug}
                    onChange={(e) =>
                        setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))
                    }
                    placeholder="workspace-slug"
                />

                <Button className="w-full">Save Workspace</Button>
            </div>

        </Card>
    );
}