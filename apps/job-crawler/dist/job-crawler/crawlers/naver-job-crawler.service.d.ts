import { IJobCrawler } from '../job-crawler.interface';
import { HttpService } from '@nestjs/axios';
import { JobPost } from '../job-post.schema';
export declare class NaverJobCrawler implements IJobCrawler {
    private readonly httpService;
    private readonly logger;
    constructor(httpService: HttpService);
    crawl(): Promise<JobPost[]>;
}
