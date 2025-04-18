import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { FirebaseModule } from '../firebase/firebase.module';
import { KakaoJobCrawler } from './crawlers/kakao-job-crawler.service';
import { LineJobCrawler } from './crawlers/line-job-crawler.service';
import { NaverJobCrawler } from './crawlers/naver-job-crawler.service';
import { WoowahanJobCrawler } from './crawlers/woowahan-job-crawler.service';
import { JobCrawlerOrchestrator } from './job-crawler.orchestrator.service';
import { ScheduledJobService } from './job-crawler.scheduler.service';

@Module({
  imports: [HttpModule, ScheduleModule.forRoot(), FirebaseModule],
  providers: [
    NaverJobCrawler,
    KakaoJobCrawler,
    LineJobCrawler,
    WoowahanJobCrawler,
    JobCrawlerOrchestrator,
    {
      provide: 'JOB_CRAWLER',
      useFactory: (
        naverJobCrawler: NaverJobCrawler,
        kakaoJobCrawler: KakaoJobCrawler,
        lineJobCrawler: LineJobCrawler,
        woowahanJobCrawler: WoowahanJobCrawler,
      ) => {
        return [naverJobCrawler, kakaoJobCrawler, lineJobCrawler, woowahanJobCrawler];
      },
      inject: [NaverJobCrawler, KakaoJobCrawler, LineJobCrawler, WoowahanJobCrawler],
    },
    ScheduledJobService,
  ],
  exports: [JobCrawlerOrchestrator],
})
export class JobCrawlerModule {}
