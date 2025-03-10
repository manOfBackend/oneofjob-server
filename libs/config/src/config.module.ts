import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as fs from 'fs';
import { z } from 'zod';
import * as dotenv from 'dotenv';
import { baseEnvSchema } from './config.schema';

@Module({})
export class ConfigModule {
  static register(customSchema?: z.ZodTypeAny): DynamicModule {
    dotenv.config();

    const schema =
      customSchema && customSchema instanceof z.ZodObject
        ? baseEnvSchema.merge(customSchema)
        : baseEnvSchema;

    const validate = (config: Record<string, unknown>) => {
      return schema.parse(config);
    };

    const envFilePath: string[] = [];
    if (fs.existsSync('.env')) {
      envFilePath.push('.env');
    }
    if (fs.existsSync(`.env.${process.env.NODE_ENV}`)) {
      envFilePath.push(`.env.${process.env.NODE_ENV}`);
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
