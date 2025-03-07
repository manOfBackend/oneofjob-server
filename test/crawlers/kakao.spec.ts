import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { KakaoJobCrawler } from 'src/job-crawler/crawlers/kakao-job-crawler.service';
import { JobPostSchema } from 'src/job-crawler/job-post.schema';

describe('KakaoJobCrawler', () => {
  let kakaoJobCrawler: KakaoJobCrawler;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [KakaoJobCrawler],
    }).compile();

    kakaoJobCrawler = moduleFixture.get<KakaoJobCrawler>(KakaoJobCrawler);
  });

  it('카카오로부터 공고를 가져온다.', async () => {
    const jobs = await kakaoJobCrawler.crawl();

    console.log('크롤링된 데이터:', JSON.stringify(jobs, null, 2));

    // 최소 하나 이상의 채용 공고가 있어야 함
    expect(jobs.length).toBeGreaterThan(0);

    jobs.forEach((job) => {
      expect(() => JobPostSchema.parse(job)).not.toThrow();
    });
  });
});
