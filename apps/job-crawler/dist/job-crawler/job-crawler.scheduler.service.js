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
var ScheduledJobService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduledJobService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const job_crawler_orchestrator_service_1 = require("./job-crawler.orchestrator.service");
let ScheduledJobService = ScheduledJobService_1 = class ScheduledJobService {
    jobCrawlerOrchestrator;
    logger = new common_1.Logger(ScheduledJobService_1.name);
    constructor(jobCrawlerOrchestrator) {
        this.jobCrawlerOrchestrator = jobCrawlerOrchestrator;
    }
    async handleDailyCrawl() {
        this.logger.log('정각 스케줄 시작: 크롤링 작업 실행');
        await this.jobCrawlerOrchestrator.crawlAllSites();
    }
};
exports.ScheduledJobService = ScheduledJobService;
__decorate([
    (0, schedule_1.Cron)('00 10 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ScheduledJobService.prototype, "handleDailyCrawl", null);
exports.ScheduledJobService = ScheduledJobService = ScheduledJobService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [job_crawler_orchestrator_service_1.JobCrawlerOrchestrator])
], ScheduledJobService);
//# sourceMappingURL=job-crawler.scheduler.service.js.map