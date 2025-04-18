import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { IJobCrawler } from '../job-crawler.interface';
import { JobPost } from '../job-post.schema';
import { ApiResponseDto } from './dtos/woowahan-job.dtos';

@Injectable()
export class WoowahanJobCrawler implements IJobCrawler {
  private readonly logger = new Logger(WoowahanJobCrawler.name);
  private readonly BASE_URL =
    'https://career.woowahan.com/w1/recruits?category=jobGroupCodes:BA005001&page=0&size=50&sort=updateDate,desc&jobGroupCodes=BA005001';

  constructor(private readonly httpService: HttpService) {}

  async crawl(): Promise<JobPost[]> {
    const response$ = this.httpService.get(this.BASE_URL);
    const response = await firstValueFrom(response$);
    const responseData = response.data as object;
    const jobs: JobPost[] = [];

    const apiResponse = responseData as ApiResponseDto;

    apiResponse.data.list.forEach((recruitInfoDto) => {
      try {
        const title = recruitInfoDto.recruitName;
        const company = recruitInfoDto.recruitCorporationNumber;
        const careers = ['신입'];
        if (recruitInfoDto.careerRestrictionMinYears > 0) {
          careers[0] = '경력';
        }
        const employmentType = '정규직';
        const startDate = new Date(recruitInfoDto.recruitOpenDate);
        let endDate = new Date(recruitInfoDto.recruitCloseDate);
        if (recruitInfoDto.recruitEndDate < recruitInfoDto.recruitCloseDate) {
          endDate = new Date(recruitInfoDto.recruitEndDate);
        }
        const url = `https://career.woowahan.com/recruitment/${recruitInfoDto.recruitNumber}/detail?category=jobGroupCodes=BA005001`;
        const jobPost = {
          title,
          company,
          careers,
          employmentType,
          startDate,
          endDate,
          url,
        } as JobPost;
        jobs.push(jobPost);
      } catch (e) {
        this.logger.error(
          `Failed parsing job: ${e.message} \n ${JSON.stringify(recruitInfoDto, null, 2)}`,
        );
      }
    });

    this.logger.log(`우아한 채용공고 ${jobs.length}건 크롤링 완료`);
    return jobs;
  }
}
