import { z } from 'zod';

export const baseEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  FIREBASE_CREDENTIAL_BASE64: z.string().min(1, 'FIREBASE_CREDENTIAL_BASE64가 필요합니다.'),
  FIREBASE_DATABASE_URL: z.string().url('FIREBASE_DATABASE_URL은 유효한 URL이어야 합니다.'),
});
