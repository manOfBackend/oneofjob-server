import { z } from 'zod';
export declare const JobPostSchema: z.ZodObject<{
    title: z.ZodString;
    company: z.ZodString;
    career: z.ZodOptional<z.ZodString>;
    employmentType: z.ZodOptional<z.ZodString>;
    period: z.ZodOptional<z.ZodString>;
    url: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    company: string;
    url: string;
    career?: string | undefined;
    employmentType?: string | undefined;
    period?: string | undefined;
}, {
    title: string;
    company: string;
    url: string;
    career?: string | undefined;
    employmentType?: string | undefined;
    period?: string | undefined;
}>;
export type JobPost = z.infer<typeof JobPostSchema>;
