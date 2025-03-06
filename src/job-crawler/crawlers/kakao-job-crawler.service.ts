import { Injectable, Logger } from '@nestjs/common';
import { IJobCrawler } from '../job-crawler.interface';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { JobPost } from '../job-post.schema';

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
      const response = await firstValueFrom(
        this.httpService.get(`${this.BASE_URL}?page=${currentPage}`),
      );
      const data = response.data;

      if (!data.jobList || !Array.isArray(data.jobList)) {
        throw new Error('카카오 채용 공고 데이터가 올바르지 않습니다.');
      }

      totalPages = data.totalPage;

      data.jobList.forEach((job: any) => {
        jobs.push({
          title: job.jobOfferTitle,
          company: 'KAKAO',
          career: job.jobOfferTitle?.includes('신입') ? '신입' : '경력',
          employmentType: job.employeeTypeName || '근로 조건 없음',
          period: job.endDate ? job.endDate : '채용 마감 기한 없음',
          url: `https://careers.kakao.com/jobs/${job.realId}`,
        });
      });

      this.logger.log(
        `카카오에서 ${data.jobList.length}건의 공고를 가져옴 (페이지 ${currentPage}/${totalPages})`,
      );
      currentPage++;
    }

    this.logger.log(`카카오에서 총 ${jobs.length}건의 채용공고 크롤링 완료`);
    return jobs;
  }
}
