import { z } from 'zod';

export const JobPostSchema = z.object({
  title: z.string().min(1, '공고 제목이 필요합니다.'),
  company: z.string().min(1, '회사명이 필요합니다.'),
  career: z.string().optional(), // 경력 정보 (없을 수도 있음)
  employmentType: z.string().optional(), // 정규직, 계약직 등
  period: z.string().optional(), // 모집 기간
  url: z.string().url('유효한 URL이 필요합니다.'),
});

export type JobPost = z.infer<typeof JobPostSchema>;
