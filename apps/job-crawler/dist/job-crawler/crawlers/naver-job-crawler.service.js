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
var NaverJobCrawler_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NaverJobCrawler = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const cheerio = require("cheerio");
const rxjs_1 = require("rxjs");
let NaverJobCrawler = NaverJobCrawler_1 = class NaverJobCrawler {
    httpService;
    logger = new common_1.Logger(NaverJobCrawler_1.name);
    constructor(httpService) {
        this.httpService = httpService;
    }
    async crawl() {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get('https://recruit.navercorp.com/rcrt/list.do?srchClassCd=1000000'));
        const html = response.data;
        const $ = cheerio.load(html);
        const jobs = [];
        $('.card_item').each((_, el) => {
            const title = $(el).find('.card_title').text().trim();
            const career = $(el).find('dt:contains("모집 경력") + dd').text().trim();
            const employmentType = $(el).find('dt:contains("근로 조건") + dd').text().trim();
            const period = $(el).find('dt:contains("모집 기간") + dd').text().trim();
            const url = $(el).find('.card_link').attr('href');
            jobs.push({
                title,
                company: 'NAVER',
                career,
                employmentType,
                period,
                url: url ? `https://recruit.navercorp.com${url}` : '',
            });
        });
        this.logger.log(`네이버 채용공고 ${jobs.length}건 크롤링 완료`);
        return jobs;
    }
};
exports.NaverJobCrawler = NaverJobCrawler;
exports.NaverJobCrawler = NaverJobCrawler = NaverJobCrawler_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], NaverJobCrawler);
//# sourceMappingURL=naver-job-crawler.service.js.map