import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { NaverJobCrawler } from 'src/job-crawler/crawlers/naver-job-crawler.service';
import { JobPostSchema } from 'src/job-crawler/job-post.schema';

describe('NaverJobCrawler', () => {
  let naverJobCrawler: NaverJobCrawler;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [NaverJobCrawler],
    }).compile();

    naverJobCrawler = moduleFixture.get<NaverJobCrawler>(NaverJobCrawler);
  });

  it('네이버로 부터 공고를 가져온다.', async () => {
    const jobs = await naverJobCrawler.crawl();

    console.log('크롤링된 데이터:', JSON.stringify(jobs, null, 2));

    // 최소 하나 이상의 채용 공고가 있어야 함
    expect(jobs.length).toBeGreaterThan(0);

    jobs.forEach((job) => {
      expect(() => JobPostSchema.parse(job)).not.toThrow();
    });
  });
});
