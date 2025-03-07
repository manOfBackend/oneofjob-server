import { JobPost } from './job-post.schema';

export interface IJobCrawler {
  crawl(): Promise<JobPost[]>;
}
