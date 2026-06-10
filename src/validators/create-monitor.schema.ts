import { z } from "zod";
import { HttpMethod } from "@/types/monitor.types";

export const headerEntrySchema = z.object({
    id:    z.string(),
    key:   z.string().min(1, "Key is required"),
    value: z.string(),
});

export const createMonitorFormSchema = z.object({
    name:     z
        .string()
        .min(1, "Name is required")
        .max(255).trim(),
    url:      z
        .string()
        .url("Enter a valid URL (e.g. https://api.example.com)"),
    method:   z
        .nativeEnum(HttpMethod),
    interval: z
        .number()
        .int()
        .min(10, "Minimum interval is 10 seconds"),
    timeout: z
        .number()
        .int()
        .min(1, "Minimum is 1 second")
        .max(60, "Maximum is 60 seconds"),
    headers: z.array(headerEntrySchema),
    body:    z.string().optional(),
});

export type CreateMonitorFormSchema = z.infer<typeof createMonitorFormSchema>;

export function toCreateMonitorDto(values: CreateMonitorFormSchema) {
    const headers: Record<string, string> = {};
    values.headers.forEach(({ key, value }) => {
        if (key.trim()) headers[key.trim()] = value;
    });
    return {
        name:     values.name,
        url:      values.url,
        method:   values.method,
        interval: values.interval,
        timeout:  values.timeout,
        headers,
        body:     values.body || undefined,
    };
}