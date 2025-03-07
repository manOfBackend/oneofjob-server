"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var JobCrawlerOrchestrator_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobCrawlerOrchestrator = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("../firebase/firebase.service");
let JobCrawlerOrchestrator = JobCrawlerOrchestrator_1 = class JobCrawlerOrchestrator {
    firebaseService;
    crawlers;
    logger = new common_1.Logger(JobCrawlerOrchestrator_1.name);
    constructor(firebaseService, crawlers) {
        this.firebaseService = firebaseService;
        this.crawlers = crawlers;
    }
    async crawlAllSites() {
        for (const crawler of this.crawlers) {
            try {
                const jobs = await crawler.crawl();
                this.logger.log(`총 ${jobs.length}건의 채용공고 크롤링됨`);
                await this.firebaseService.saveJobs(jobs);
            }
            catch (error) {
                this.logger.error(`크롤링 실패: ${error.message}`);
            }
        }
    }
};
exports.JobCrawlerOrchestrator = JobCrawlerOrchestrator;
exports.JobCrawlerOrchestrator = JobCrawlerOrchestrator = JobCrawlerOrchestrator_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('JOB_CRAWLER')),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService, Array])
], JobCrawlerOrchestrator);
//# sourceMappingURL=job-crawler.orchestrator.service.js.map