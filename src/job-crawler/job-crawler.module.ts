import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { NaverJobCrawler } from './crawlers/naver-job-crawler.service';
import { JobCrawlerOrchestrator } from './job-crawler.orchestrator.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { KakaoJobCrawler } from './crawlers/kakao-job-crawler.service';
import { ScheduledJobService } from './job-crawler.scheduler.service';

@Module({
  imports: [HttpModule, ScheduleModule.forRoot(), FirebaseModule],
  providers: [
    NaverJobCrawler,
    KakaoJobCrawler,
    JobCrawlerOrchestrator,
    {
      provide: 'JOB_CRAWLER',
      useFactory: (naverJobCrawler: NaverJobCrawler, kakaoJobCrawler: KakaoJobCrawler) => {
        return [naverJobCrawler, kakaoJobCrawler];
      },
      inject: [NaverJobCrawler, KakaoJobCrawler],
    },
    ScheduledJobService,
  ],
  exports: [JobCrawlerOrchestrator],
})
export class JobCrawlerModule {}
