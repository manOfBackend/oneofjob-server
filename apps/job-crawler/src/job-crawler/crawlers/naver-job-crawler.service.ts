import { Injectable, Logger } from '@nestjs/common';
import { IJobCrawler } from '../job-crawler.interface';
import { HttpService } from '@nestjs/axios';
import * as cheerio from 'cheerio';
import { firstValueFrom } from 'rxjs';
import { JobPost, JobPostSchema, CareerType, EmploymentType } from '../job-post.schema';
import { parseDateRange } from './utils/date-utils';

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
      try {
        const title = $(el).find('.card_title').text().trim();
        const careerText = $(el).find('dt:contains("모집 경력") + dd').text().trim();
        const employmentTypeText = $(el).find('dt:contains("근로 조건") + dd').text().trim();
        const periodText = $(el).find('dt:contains("모집 기간") + dd').text().trim();

        let annoId = '';
        const cardLink = $(el).find('.card_link');
        const onclickAttr = cardLink.attr('onclick');

        if (onclickAttr && onclickAttr.includes('show(')) {
          const match = onclickAttr.match(/show\('(\d+)'\)/);
          if (match && match[1]) {
            annoId = match[1];
          }
        }

        if (!annoId) {
          const copyUrlBtn = $(el).find('.btn_close').next('.link_type');
          const copyUrlOnclick = copyUrlBtn.attr('onclick');
          if (copyUrlOnclick && copyUrlOnclick.includes("copyUrl('")) {
            const match = copyUrlOnclick.match(/copyUrl\('(\d+)'\)/);
            if (match && match[1]) {
              annoId = match[1];
            }
          }
        }

        const careers: CareerType[] = [];
        if (careerText.includes('신입')) {
          careers.push('신입');
        }
        if (careerText.includes('인턴')) {
          careers.push('인턴');
        }
        if (
          careerText.includes('경력') ||
          (!careerText.includes('신입') && !careerText.includes('인턴'))
        ) {
          careers.push('경력');
        }

        let employmentType: EmploymentType = '비정규직';
        if (employmentTypeText.includes('비정규')) {
          employmentType = '비정규직';
        } else if (employmentTypeText.includes('정규')) {
          employmentType = '정규직';
        }

        const { startDate, endDate } = parseDateRange(periodText);

        const jobPost = {
          title,
          company: 'NAVER',
          careers: careers.length > 0 ? careers : ['신입'],
          employmentType,
          startDate,
          endDate,
          url: annoId ? `https://recruit.navercorp.com/rcrt/view.do?annoId=${annoId}` : '',
        } as JobPost;

        JobPostSchema.parse(jobPost);

        jobs.push(jobPost);
      } catch (error) {
        this.logger.error(`공고 파싱 오류: ${error.message}`);
      }
    });

    this.logger.log(`네이버 채용공고 ${jobs.length}건 크롤링 완료`);
    return jobs;
  }
}
