"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobCrawlerModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const schedule_1 = require("@nestjs/schedule");
const naver_job_crawler_service_1 = require("./crawlers/naver-job-crawler.service");
const job_crawler_orchestrator_service_1 = require("./job-crawler.orchestrator.service");
const firebase_module_1 = require("../firebase/firebase.module");
const kakao_job_crawler_service_1 = require("./crawlers/kakao-job-crawler.service");
const job_crawler_scheduler_service_1 = require("./job-crawler.scheduler.service");
let JobCrawlerModule = class JobCrawlerModule {
};
exports.JobCrawlerModule = JobCrawlerModule;
exports.JobCrawlerModule = JobCrawlerModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule, schedule_1.ScheduleModule.forRoot(), firebase_module_1.FirebaseModule],
        providers: [
            naver_job_crawler_service_1.NaverJobCrawler,
            kakao_job_crawler_service_1.KakaoJobCrawler,
            job_crawler_orchestrator_service_1.JobCrawlerOrchestrator,
            {
                provide: 'JOB_CRAWLER',
                useFactory: (naverJobCrawler, kakaoJobCrawler) => {
                    return [naverJobCrawler, kakaoJobCrawler];
                },
                inject: [naver_job_crawler_service_1.NaverJobCrawler, kakao_job_crawler_service_1.KakaoJobCrawler],
            },
            job_crawler_scheduler_service_1.ScheduledJobService,
        ],
        exports: [job_crawler_orchestrator_service_1.JobCrawlerOrchestrator],
    })
], JobCrawlerModule);
//# sourceMappingURL=job-crawler.module.js.map