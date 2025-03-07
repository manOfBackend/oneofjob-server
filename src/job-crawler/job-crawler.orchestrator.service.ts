import { Injectable, Logger, Inject } from '@nestjs/common';
import { IJobCrawler } from './job-crawler.interface';
import { FirebaseService } from '../firebase/firebase.service';
import { JobPost } from './job-post.schema';

@Injectable()
export class JobCrawlerOrchestrator {
  private readonly logger = new Logger(JobCrawlerOrchestrator.name);

  constructor(
    private readonly firebaseService: FirebaseService,
    @Inject('JOB_CRAWLER') private readonly crawlers: IJobCrawler[],
  ) {}

  async crawlAllSites(): Promise<void> {
    for (const crawler of this.crawlers) {
      try {
        const jobs: JobPost[] = await crawler.crawl();
        this.logger.log(`총 ${jobs.length}건의 채용공고 크롤링됨`);
        await this.firebaseService.saveJobs(jobs);
      } catch (error) {
        this.logger.error(`크롤링 실패: ${error.message}`);
      }
    }
  }
}
