"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobPostSchema = void 0;
const zod_1 = require("zod");
exports.JobPostSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, '공고 제목이 필요합니다.'),
    company: zod_1.z.string().min(1, '회사명이 필요합니다.'),
    career: zod_1.z.string().optional(),
    employmentType: zod_1.z.string().optional(),
    period: zod_1.z.string().optional(),
    url: zod_1.z.string().url('유효한 URL이 필요합니다.'),
});
//# sourceMappingURL=job-post.schema.js.map