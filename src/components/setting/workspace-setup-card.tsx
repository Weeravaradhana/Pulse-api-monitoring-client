"use client";

import React, {useEffect, useState} from "react";
import { Card } from "../common/card";
import { Input } from "../common/input";
import { Button } from "../common/button";
import {useForm} from "react-hook-form";
import {tenantSchema, TenantSchema} from "@/validators/tenant-create.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import axios, {AxiosError} from "axios";
import {SearchInput} from "@/components/common/search";
import {useDebounce} from "@/hooks/use-debounce";

interface UserSearchResult {
    id: string;
    email: string;
    name: string;
}

export const  WorkspaceSetupCard = ({onTenantCreate}: {onTenantCreate: (id: string) => void}) =>{
    const [apiError, setApiError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<UserSearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedEmail, setSelectedEmail] = useState("");

    const debouncedSearchQuery =  useDebounce(searchQuery, 400);

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors, isValid}

    } = useForm<TenantSchema>({
        resolver: zodResolver(tenantSchema),
        mode: 'onChange',
        defaultValues: {
            name: '',
            slug: '',
        }
    });

    useEffect(() => {
       const fetchUser =  async () => {
            if (!debouncedSearchQuery || debouncedSearchQuery.length < 2){
                setSearchResults([]);
                return;
            }

            setIsSearching(true);
            try {
               const response =  await axios.get(`http://localhost:3000/auth/search?q=${debouncedSearchQuery}`, {
                    withCredentials: true
                });

               setSearchResults(response.data.data || response.data || [])
            }catch (err) {
                console.error("Error fetching users:", err);
            }finally {
                setIsSearching(false)
            }
        };

       fetchUser();
    },[debouncedSearchQuery]);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const nameValue = e.target.value;
        setValue('name', nameValue, {shouldValidate: true});

        const generateSlug = nameValue
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/(^-|-$)+/g, '')
        setValue('slug', generateSlug, {shouldValidate: true})
    }

   const onSubmit = async (data: TenantSchema) =>{
        setLoading(true);
        setApiError(null);

        try {
            const response = await axios.post('http://localhost:3000/tenant', data, {
                withCredentials: true
            });

            if (response){
                alert('Organization Registered Successfully!');
                console.log(response)
                onTenantCreate(response.data.data.id);
            }
        }catch (error) {
          if (error instanceof AxiosError){
              setApiError(error.response?.data.message || 'Failed to create organization')
          }
        }finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <Card>

            <h3 className="text-sm font-semibold mb-4">Workspace</h3>

            <div className="space-y-5">
                <Input {...register('name')} placeholder={"Tenant name"} onChange={handleNameChange}/>

                <Input
                    {...register('slug')}
                    placeholder="workspace-slug"
                />



                <Button className="w-full">Save Workspace</Button>
            </div>

            <div className="space-y-2 mt-7">

                <div className="relative flex gap-3 items-start">
                    <div className="relative flex-1">
                <SearchInput placeholder="Add members"
                 value={searchQuery}
                 onChange={(value) => {
                     setSearchQuery(value);
                     setSelectedEmail(value)
                 }}
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
                                            className="w-full text-left px-3 py-2 text-xs rounded-md hover:bg-slate-50 transition-colors flex flex-col gap-0.5"
                                            onClick={() => {
                                                setSearchQuery(user.email);
                                                setSelectedEmail(user.email);
                                                setSearchResults([]); // close dropdown
                                            }}
                                        >
                                            <span className="font-medium text-slate-800">{user.name}</span>
                                            <span className="text-slate-400">{user.email}</span>
                                        </button>
                                    ))
                                )}
                            </div>
                            )}
                    </div>

                <Button className="w-37.5">Add</Button>
            </div>
            </div>


        </Card>
        </form>
    );
}