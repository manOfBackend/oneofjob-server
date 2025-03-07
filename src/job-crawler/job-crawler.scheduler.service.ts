import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { JobCrawlerOrchestrator } from './job-crawler.orchestrator.service';

@Injectable()
export class ScheduledJobService {
  private readonly logger = new Logger(ScheduledJobService.name);

  constructor(private readonly jobCrawlerOrchestrator: JobCrawlerOrchestrator) {}

  // 매일 00:00
  @Cron('0 0 * * *')
  async handleDailyCrawl(): Promise<void> {
    this.logger.log('정각 스케줄 시작: 크롤링 작업 실행');
    await this.jobCrawlerOrchestrator.crawlAllSites();
  }
}
