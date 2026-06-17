import { z } from 'zod';

export const tenantSchema = z.object({
    name: z
        .string()
        .min(3, { message: 'Organization name must be at least 3 characters' })
        .max(50, { message: 'Organization name cannot exceed 50 characters' }),
    slug: z
        .string()
        .min(3, { message: 'Slug must be at least 3 characters' })
        .regex(/^[a-z0-9-]+$/, {
            message: 'Slug can only contain lowercase letters, numbers, and dashes (e.g., travel-ease)',
        }),
});

export type TenantSchema = z.infer<typeof tenantSchema>;