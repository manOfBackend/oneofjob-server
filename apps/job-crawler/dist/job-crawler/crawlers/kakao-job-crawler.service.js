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
var KakaoJobCrawler_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KakaoJobCrawler = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let KakaoJobCrawler = KakaoJobCrawler_1 = class KakaoJobCrawler {
    httpService;
    logger = new common_1.Logger(KakaoJobCrawler_1.name);
    BASE_URL = 'https://careers.kakao.com/public/api/job-list';
    constructor(httpService) {
        this.httpService = httpService;
    }
    async crawl() {
        let currentPage = 1;
        let totalPages = 1;
        const jobs = [];
        while (currentPage <= totalPages) {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.BASE_URL}?page=${currentPage}`));
            const data = response.data;
            if (!data.jobList || !Array.isArray(data.jobList)) {
                throw new Error('카카오 채용 공고 데이터가 올바르지 않습니다.');
            }
            totalPages = data.totalPage;
            data.jobList.forEach((job) => {
                jobs.push({
                    title: job.jobOfferTitle,
                    company: 'KAKAO',
                    career: job.jobOfferTitle?.includes('신입') ? '신입' : '경력',
                    employmentType: job.employeeTypeName || '근로 조건 없음',
                    period: job.endDate ? job.endDate : '채용 마감 기한 없음',
                    url: `https://careers.kakao.com/jobs/${job.realId}`,
                });
            });
            this.logger.log(`카카오에서 ${data.jobList.length}건의 공고를 가져옴 (페이지 ${currentPage}/${totalPages})`);
            currentPage++;
        }
        this.logger.log(`카카오에서 총 ${jobs.length}건의 채용공고 크롤링 완료`);
        return jobs;
    }
};
exports.KakaoJobCrawler = KakaoJobCrawler;
exports.KakaoJobCrawler = KakaoJobCrawler = KakaoJobCrawler_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], KakaoJobCrawler);
//# sourceMappingURL=kakao-job-crawler.service.js.map