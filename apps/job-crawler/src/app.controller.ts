import { Controller, Get, Post } from '@nestjs/common';
import { JobCrawlerOrchestrator } from './job-crawler/job-crawler.orchestrator.service';

@Controller()
export class AppController {
  constructor(private readonly orchestrator: JobCrawlerOrchestrator) {}

  @Post('crawl')
  async triggerCrawl() {
    await this.orchestrator.crawlAllSites();

    return { message: 'OK' };
  }

  @Get('crawl/woowahan')
  async triggerWoowahanCrawl() {
    return await this.orchestrator.crawlWoowahan();
  }
}
