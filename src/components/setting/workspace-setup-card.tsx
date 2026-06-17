"use client";

import React, { useState } from "react";
import { Card } from "../common/card";
import { Input } from "../common/input";
import { Button } from "../common/button";
import {useForm} from "react-hook-form";
import {tenantSchema, TenantSchema} from "@/validators/tenant-create.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import axios, {AxiosError} from "axios";

export const  WorkspaceSetupCard = ({onTenantCreate}: {onTenantCreate: (id: string) => void}) =>{
    const [apiError, setApiError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

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
    })

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
                onTenantCreate(response.data.id);
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

            <div className="space-y-3">
                <Input {...register('name')} placeholder={"Tenant name"} onChange={handleNameChange}/>

                <Input
                    {...register('slug')}
                    placeholder="workspace-slug"
                />

                <Button className="w-full">Save Workspace</Button>
            </div>

        </Card>
        </form>
    );
}