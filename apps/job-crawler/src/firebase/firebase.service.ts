import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private readonly logger = new Logger(FirebaseService.name);
  private db: FirebaseFirestore.Firestore;

  constructor(private readonly configService: ConfigService) {
    if (!admin.apps.length) {
      const credentialBase64 = configService.get<string>('FIREBASE_CREDENTIAL_BASE64');

      if (!credentialBase64) {
        this.logger.error('FIREBASE_CREDENTIAL_BASE64 환경변수가 설정되지 않았습니다.');
        return;
      }
      const credentialJson = Buffer.from(credentialBase64, 'base64').toString('utf-8');
      const credential = JSON.parse(credentialJson);

      admin.initializeApp({
        credential: admin.credential.cert(credential),
        databaseURL: configService.get<string>('FIREBASE_DATABASE_URL'),
      });
      this.logger.log('Firebase 초기화 완료');
    }
    this.db = admin.firestore();
  }

  async saveJob(job: any): Promise<void> {
    const snapshot = await this.db.collection('jobs').where('url', '==', job.url).get();
    if (snapshot.empty) {
      await this.db.collection('jobs').add(job);
      this.logger.log(`새 채용공고 저장: ${job.title}`);
    }
  }

  async saveJobs(jobs: any[]): Promise<void> {
    for (const job of jobs) {
      await this.saveJob(job);
    }
  }
}
