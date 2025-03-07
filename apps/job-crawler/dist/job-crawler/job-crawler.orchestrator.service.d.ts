import { IJobCrawler } from './job-crawler.interface';
import { FirebaseService } from '../firebase/firebase.service';
export declare class JobCrawlerOrchestrator {
    private readonly firebaseService;
    private readonly crawlers;
    private readonly logger;
    constructor(firebaseService: FirebaseService, crawlers: IJobCrawler[]);
    crawlAllSites(): Promise<void>;
}
