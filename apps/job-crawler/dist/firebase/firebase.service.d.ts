import { ConfigService } from '@nestjs/config';
export declare class FirebaseService {
    private readonly configService;
    private readonly logger;
    private db;
    constructor(configService: ConfigService);
    saveJob(job: any): Promise<void>;
    saveJobs(jobs: any[]): Promise<void>;
}
