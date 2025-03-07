import { JobCrawlerOrchestrator } from './job-crawler/job-crawler.orchestrator.service';
export declare class AppController {
    private readonly orchestrator;
    constructor(orchestrator: JobCrawlerOrchestrator);
    triggerCrawl(): Promise<{
        message: string;
    }>;
}
