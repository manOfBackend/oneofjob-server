import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private readonly logger = new Logger(FirebaseService.name);
  private db: FirebaseFirestore.Firestore;

  constructor(private readonly configService: ConfigService) {
    if (!admin.apps.length) {
      const credentialPath = this.configService.get<string>('FIREBASE_CREDENTIAL_PATH');
      const databaseURL = this.configService.get<string>('FIREBASE_DATABASE_URL');

      if (!credentialPath || !databaseURL) {
        throw new Error(
          'FIREBASE_CREDENTIAL_PATH 또는 FIREBASE_DATABASE_URL이 설정되지 않았습니다.',
        );
      }
      admin.initializeApp({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-require-imports
        credential: admin.credential.cert(require(credentialPath)),
        databaseURL,
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
