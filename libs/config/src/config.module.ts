import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as fs from 'fs';
import { z } from 'zod';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { baseEnvSchema } from './config.schema';

@Module({})
export class ConfigModule {
  static register(customSchema?: z.AnyZodObject): DynamicModule {
    dotenv.config();

    const schema = customSchema ? baseEnvSchema.merge(customSchema) : baseEnvSchema;

    const validate = (config: Record<string, unknown>) => {
      return schema.parse(config);
    };

    const rootDir = process.cwd();
    const envFilePath: string[] = [];

    const defaultEnvPath = path.join(rootDir, '.env');
    if (fs.existsSync(defaultEnvPath)) {
      envFilePath.push(defaultEnvPath);
    }

    const envSpecificPath = path.join(rootDir, `.env.${process.env.NODE_ENV || 'development'}`);
    if (fs.existsSync(envSpecificPath)) {
      envFilePath.push(envSpecificPath);
    }

    return {
      module: ConfigModule,
      imports: [
        NestConfigModule.forRoot({
          isGlobal: true,
          envFilePath,
          validate,
        }),
      ],
      exports: [NestConfigModule],
    };
  }
}
