import { Injectable, Logger } from '@nestjs/common';
import { IJobCrawler } from '../job-crawler.interface';
import { HttpService } from '@nestjs/axios';
import * as cheerio from 'cheerio';
import { firstValueFrom } from 'rxjs';
import { CareerType, EmploymentType, JobPost } from '../job-post.schema';

@Injectable()
export class LineJobCrawler implements IJobCrawler {
  private readonly logger = new Logger(LineJobCrawler.name);
  private readonly BASE_URL = 'https://careers.linecorp.com/ko/jobs';
  private readonly QUERY_PARAMS =
    '?ca=All&ci=Gwacheon,Bundang&co=East%20Asia&fi=Client-side,Server-side,Web%20Development,Infra,QA%2FSET,Data%20Engineering,Security%20Engineering,System%20Engineering,Tech%20Management';

  constructor(private readonly httpService: HttpService) {}

  async crawl(): Promise<JobPost[]> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.BASE_URL}${this.QUERY_PARAMS}`),
    );
    const html = response.data;
    const $ = cheerio.load(html);
    const jobs: JobPost[] = [];

    $('.job_list li').each((_, el) => {
      try {
        const titleElement = $(el).find('.title');
        const title = titleElement
          .text()
          .trim()
          .replace(/\s+NEW\s*$/, '')
          .trim();

        const url = $(el).find('a').attr('href');
        const fullUrl = url ? `https://careers.linecorp.com${url}` : '';

        const textFilter = $(el).find('.text_filter').text().trim();
        const [location, companyAndDepartment, employmentTypeText] = textFilter
          .split('|')
          .map((item) => item.trim());

        let company = 'LINE';
        if (companyAndDepartment) {
          const companyMatch = companyAndDepartment.match(/LINE[^\s]*/);
          if (companyMatch) {
            company = companyMatch[0].trim();
          }
        }

        let employmentType: EmploymentType = '정규직';
        if (employmentTypeText && employmentTypeText.includes('계약')) {
          employmentType = '비정규직';
        }

        const careers: CareerType[] = [];
        const titleLower = title.toLowerCase();

        if (titleLower.includes('인턴')) {
          careers.push('인턴');
        } else if (titleLower.includes('신입') || titleLower.includes('new grad')) {
          careers.push('신입');
        } else {
          careers.push('경력');
        }

        const periodText = $(el).find('.date').text().trim();
        let startDate: Date | undefined;
        let endDate: Date | undefined;

        if (periodText) {
          const dateMatch = periodText.match(/(\d{4}-\d{2}-\d{2})\s*~\s*(.+)/);
          if (dateMatch) {
            const startDateStr = dateMatch[1];
            const endDateStr = dateMatch[2];

            startDate = new Date(startDateStr);

            if (endDateStr && !endDateStr.includes('채용시까지')) {
              const tempEndDate = new Date(endDateStr);
              endDate = isNaN(tempEndDate.getTime()) ? undefined : tempEndDate;
            }
          }
        }

        jobs.push({
          title,
          company,
          careers,
          employmentType,
          startDate,
          endDate,
          url: fullUrl,
        } as JobPost);
      } catch (error) {
        this.logger.error(`라인 채용공고 파싱 중 오류 발생: ${error.message}`);
      }
    });

    this.logger.log(`라인 채용공고 ${jobs.length}건 크롤링 완료`);
    return jobs;
  }
}
