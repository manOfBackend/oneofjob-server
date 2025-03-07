import { JobCrawlerOrchestrator } from './job-crawler.orchestrator.service';
export declare class ScheduledJobService {
    private readonly jobCrawlerOrchestrator;
    private readonly logger;
    constructor(jobCrawlerOrchestrator: JobCrawlerOrchestrator);
    handleDailyCrawl(): Promise<void>;
}
