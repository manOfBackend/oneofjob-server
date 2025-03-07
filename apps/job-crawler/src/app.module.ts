import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { JobCrawlerModule } from './job-crawler/job-crawler.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), JobCrawlerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
