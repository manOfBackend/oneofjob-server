import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { FirebaseService } from '../src/firebase/firebase.service';

describe('JobCrawlerController (E2E)', () => {
  let app: INestApplication;

  class DummyFirebaseService {
    async saveJobs(): Promise<void> {
      console.log('Firebase Mock Service: saveJobs() 호출됨');
    }
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(FirebaseService)
      .useValue(new DummyFirebaseService())
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/jobs/crawl (POST)', async () => {
    const response = await request(app.getHttpServer()).post('/crawl').expect(201);

    expect(response.body).toEqual({
      message: 'OK',
    });

    console.log('크롤링 API 응답:', response.body);
  });

  afterAll(async () => {
    await app.close();
  });
});
