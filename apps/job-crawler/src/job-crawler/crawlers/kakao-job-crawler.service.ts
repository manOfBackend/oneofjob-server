import { Injectable, Logger } from '@nestjs/common';
import { IJobCrawler } from '../job-crawler.interface';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { JobPost, JobPostSchema, CareerType, EmploymentType } from '../job-post.schema';
import { parseDateRange } from './utils/date-utils';

@Injectable()
export class KakaoJobCrawler implements IJobCrawler {
  private readonly logger = new Logger(KakaoJobCrawler.name);
  private readonly BASE_URL = 'https://careers.kakao.com/public/api/job-list';

  constructor(private readonly httpService: HttpService) {}

  async crawl(): Promise<JobPost[]> {
    let currentPage = 1;
    let totalPages = 1;
    const jobs: JobPost[] = [];

    while (currentPage <= totalPages) {
      try {
        const response = await firstValueFrom(
          this.httpService.get(`${this.BASE_URL}?page=${currentPage}`),
        );
        const data = response.data;

        if (!data.jobList || !Array.isArray(data.jobList)) {
          throw new Error('카카오 채용 공고 데이터가 올바르지 않습니다.');
        }

        totalPages = data.totalPage;

        for (const job of data.jobList) {
          try {
            const careers: CareerType[] = [];

            if (job.jobOfferTitle?.includes('신입')) {
              careers.push('신입');
            }

            if (job.jobOfferTitle?.includes('인턴')) {
              careers.push('인턴');
            }

            if (careers.length === 0 || job.jobOfferTitle?.includes('경력')) {
              careers.push('경력');
            }

            let employmentType: EmploymentType = '비정규직';
            if (job.employeeTypeName) {
              if (job.employeeTypeName.includes('비정규')) {
                employmentType = '비정규직';
              } else if (job.employeeTypeName.includes('정규')) {
                employmentType = '정규직';
              }
            }

            let startDate: Date | undefined;
            let endDate: Date | undefined;

            if (job.regDate) {
              const regDateStr = job.regDate.split('T')[0];
              const { startDate: parsedStart } = parseDateRange(regDateStr);
              startDate = parsedStart;
            }

            if (job.endDate) {
              const endDateStr = job.endDate.split('T')[0];
              const { endDate: parsedEnd } = parseDateRange(endDateStr);
              endDate = parsedEnd;
            }

            // JobPost 객체 생성
            const jobPost = {
              title: job.jobOfferTitle,
              company: 'KAKAO',
              careers: careers.length > 0 ? careers : ['경력'],
              employmentType,
              startDate,
              endDate,
              url: `https://careers.kakao.com/jobs/${job.realId}`,
            } as JobPost;

            JobPostSchema.parse(jobPost);

            jobs.push(jobPost);
          } catch (error) {
            this.logger.error(
              `공고 파싱 오류: ${error instanceof Error ? error.message : String(error)}`,
            );
          }
        }

        this.logger.log(
          `카카오에서 ${data.jobList.length}건의 공고를 가져옴 (페이지 ${currentPage}/${totalPages})`,
        );
        currentPage++;
      } catch (error) {
        this.logger.error(
          `페이지 ${currentPage} 크롤링 오류: ${error instanceof Error ? error.message : String(error)}`,
        );
        currentPage++;
      }
    }

    this.logger.log(`카카오에서 총 ${jobs.length}건의 채용공고 크롤링 완료`);
    return jobs;
  }
}
