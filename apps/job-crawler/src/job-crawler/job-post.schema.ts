import { z } from 'zod';

export const CareerType = z.enum(['경력', '인턴', '신입']);
export type CareerType = z.infer<typeof CareerType>;

export const EmploymentType = z.enum(['정규직', '비정규직']);
export type EmploymentType = z.infer<typeof EmploymentType>;

export const JobPostSchema = z.object({
  title: z.string().min(1, '공고 제목이 필요합니다.'),
  company: z.string().min(1, '회사명이 필요합니다.'),
  careers: z.array(CareerType).min(1, '하나 이상의 경력 타입이 필요합니다.'),
  employmentType: EmploymentType,
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  url: z.string().url('유효한 URL이 필요합니다.'),
});

export type JobPost = z.infer<typeof JobPostSchema>;
