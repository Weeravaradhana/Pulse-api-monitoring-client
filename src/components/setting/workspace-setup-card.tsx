"use client";

import React, { useEffect, useState } from "react";
import { Card } from "../common/card";
import { Input } from "../common/input";
import { Button } from "../common/button";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { SearchInput } from "@/components/common/search";
import { useDebounce } from "@/hooks/use-debounce";

interface UserSearchResult {
    id: string;
    email: string;
    name: string;
}

interface FormInput {
    name: string;
    slug: string;
}

export const WorkspaceSetupCard = ({ onTenantCreate }: { onTenantCreate: (id: string) => void }) => {
    const [apiError, setApiError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<UserSearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

    const debouncedSearchQuery = useDebounce(searchQuery, 400);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormInput>({
        mode: 'onChange',
        defaultValues: { name: '', slug: '' }
    });

    useEffect(() => {
        const fetchUser = async () => {
            if (!debouncedSearchQuery || debouncedSearchQuery.length < 2) {
                setSearchResults([]);
                return;
            }
            setIsSearching(true);
            try {
                const response = await axios.get(`http://localhost:3000/auth/search?q=${debouncedSearchQuery}`, {
                    withCredentials: true
                });
                setSearchResults(response.data.data || response.data || []);
            } catch (err) {
                console.error("Error fetching users:", err);
            } finally {
                setIsSearching(false);
            }
        };
        fetchUser();
    }, [debouncedSearchQuery]);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const nameValue = e.target.value;
        setValue('name', nameValue, { shouldValidate: true });

        const generateSlug = nameValue
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/(^-|-$)+/g, '');
        setValue('slug', generateSlug, { shouldValidate: true });
    };

    const handleAddEmail = () => {
        const emailToAdd = searchQuery.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailToAdd || !emailRegex.test(emailToAdd)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (selectedEmails.includes(emailToAdd)) {
            setSearchQuery("");
            return;
        }

        setSelectedEmails(prev => [...prev, emailToAdd]);
        setSearchQuery("");
        setSearchResults([]);
    };

    const handleRemoveEmail = (emailToRemove: string) => {
        setSelectedEmails(prev => prev.filter(email => email !== emailToRemove));
    };

    const onSubmit = async (data: FormInput) => {
        setLoading(true);
        setApiError(null);

        const payload = {
            ...data,
            memberEmails: selectedEmails
        };

        try {
            const response = await axios.post('http://localhost:3000/tenant', payload, {
                withCredentials: true
            });

            if (response.data?.success || response.data?.data) {
                alert('Organization & Team Registered Successfully!');
                onTenantCreate(response.data.data.id);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                setApiError(error.response?.data.message || 'Failed to create organization');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="p-5 max-w-md mx-auto">
                <h3 className="text-sm font-semibold mb-4 text-slate-900">Workspace Setup</h3>

                {apiError && (
                    <div className="mb-4 text-2xs p-2 bg-red-50 text-red-600 rounded-lg border border-red-100">
                        {apiError}
                    </div>
                )}

                <div className="space-y-4">
                    <Input { ...register('name') } placeholder="Tenant name" onChange={handleNameChange} />
                    <Input { ...register('slug') } placeholder="workspace-slug" />
                </div>

                <div className="space-y-2 mt-6 pt-6 border-t border-slate-100">
                    <label className="text-2xs font-semibold text-slate-500 uppercase tracking-wider">Invite Members by Email</label>
                    <div className="relative flex gap-2 items-center">
                        <div className="relative flex-1">
                            <SearchInput
                                placeholder="Type or select email address..."
                                value={searchQuery}
                                onChange={(value) => setSearchQuery(value)}
                            />

                            {searchQuery.length >= 2 && (searchResults.length > 0 || isSearching) && (
                                <div className="absolute left-0 right-0 top-full z-30 mt-1 max-h-48 overflow-y-auto rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
                                    {isSearching ? (
                                        <div className="p-3 text-xs text-slate-400 text-center">Searching...</div>
                                    ) : (
                                        searchResults.map((user) => (
                                            <button
                                                key={user.id}
                                                type="button"
                                                className="w-full text-left px-3 py-1.5 text-xs rounded-md hover:bg-slate-50 transition-colors flex flex-col"
                                                onClick={() => {
                                                    setSearchQuery(user.email);
                                                    setSearchResults([]);
                                                }}
                                            >
                                                <span className="font-medium text-slate-800">{user.name}</span>
                                                <span className="text-2xs text-slate-400">{user.email}</span>
                                            </button>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                        <Button type="button" onClick={handleAddEmail} className="w-24 shrink-0">
                            Add
                        </Button>
                    </div>
                </div>

                {selectedEmails.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1">
                        {selectedEmails.map((email) => (
                            <div key={email} className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg pl-2 pr-1 py-0.5 text-2xs text-slate-700">
                                <span className="truncate max-w-45 font-medium">{email}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveEmail(email)}
                                    className="text-slate-400 hover:text-red-500 font-bold px-1"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-6">
                    <Button type="submit" disabled={loading} className="w-full">
                        {loading ? "Creating..." : "Save Workspace & Team"}
                    </Button>
                </div>
            </Card>
        </form>
    );
};