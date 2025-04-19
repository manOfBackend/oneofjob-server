import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { JobPostSchema } from '../../src/job-crawler/job-post.schema';
import { WoowahanJobCrawler } from '../../src/job-crawler/crawlers/woowahan-job-crawler.service';

describe('WoowahanJobCrawler', () => {
  let woowahanJobCrawler: WoowahanJobCrawler;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [WoowahanJobCrawler],
    }).compile();

    woowahanJobCrawler = moduleFixture.get<WoowahanJobCrawler>(WoowahanJobCrawler);
  });

  it('우아한형제들로부터 공고를 가져온다.', async () => {
    const jobs = await woowahanJobCrawler.crawl();

    // 최소 하나 이상의 채용 공고가 있어야 함
    expect(jobs.length).toBeGreaterThan(0);

    jobs.forEach((job) => {
      expect(() => JobPostSchema.parse(job)).not.toThrow();
    });
  });
});
