import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { NaverJobCrawler } from './crawlers/naver-job-crawler.service';
import { JobCrawlerOrchestrator } from './job-crawler.orchestrator.service';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [HttpModule, ScheduleModule.forRoot(), FirebaseModule],
  providers: [
    NaverJobCrawler,
    JobCrawlerOrchestrator,
    {
      provide: 'JOB_CRAWLER',
      useFactory: (naverJobCrawler: NaverJobCrawler) => {
        return [naverJobCrawler];
      },
      inject: [NaverJobCrawler],
    },
  ],
  exports: [JobCrawlerOrchestrator],
})
export class JobCrawlerModule {}
