import { Injectable, Logger } from '@nestjs/common';
import { IJobCrawler } from '../job-crawler.interface';
import { HttpService } from '@nestjs/axios';
import * as cheerio from 'cheerio';
import { firstValueFrom } from 'rxjs';
import { JobPost } from '../job-post.schema';

@Injectable()
export class NaverJobCrawler implements IJobCrawler {
  private readonly logger = new Logger(NaverJobCrawler.name);

  constructor(private readonly httpService: HttpService) {}

  async crawl(): Promise<JobPost[]> {
    const response = await firstValueFrom(
      this.httpService.get('https://recruit.navercorp.com/rcrt/list.do?srchClassCd=1000000'),
    );
    const html = response.data;
    const $ = cheerio.load(html);
    const jobs: JobPost[] = [];

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
}
