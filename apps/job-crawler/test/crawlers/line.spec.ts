import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { LineJobCrawler } from '../../src/job-crawler/crawlers/line-job-crawler.service';
import { JobPostSchema } from '../../src/job-crawler/job-post.schema';

describe('LineJobCrawler', () => {
  let lineJobCrawler: LineJobCrawler;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [LineJobCrawler],
    }).compile();

    lineJobCrawler = moduleFixture.get<LineJobCrawler>(LineJobCrawler);
  });

  it('라인으로부터 공고를 가져온다.', async () => {
    const jobs = await lineJobCrawler.crawl();

    // 최소 하나 이상의 채용 공고가 있어야 함
    expect(jobs.length).toBeGreaterThan(0);

    jobs.forEach((job) => {
      expect(() => JobPostSchema.parse(job)).not.toThrow();
    });
  });
});
