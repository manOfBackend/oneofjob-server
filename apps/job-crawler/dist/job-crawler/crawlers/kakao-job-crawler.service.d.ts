import { IJobCrawler } from '../job-crawler.interface';
import { HttpService } from '@nestjs/axios';
import { JobPost } from '../job-post.schema';
export declare class KakaoJobCrawler implements IJobCrawler {
    private readonly httpService;
    private readonly logger;
    private readonly BASE_URL;
    constructor(httpService: HttpService);
    crawl(): Promise<JobPost[]>;
}
