import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { Job } from '../jobs/entities/job.entity';

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
      const credential: string = JSON.parse(credentialJson);

      admin.initializeApp({
        credential: admin.credential.cert(credential),
        databaseURL: configService.get<string>('FIREBASE_DATABASE_URL'),
      });
      this.logger.log('Firebase 초기화 완료');
    }
    this.db = admin.firestore();
  }

  async findAll(filters: Record<string, string | undefined>): Promise<Job[]> {
    let query: FirebaseFirestore.Query = this.db.collection('jobs');

    const validFields = ['career', 'company', 'employmentType'];

    validFields.forEach((field) => {
      if (filters[field]) {
        query = query.where(field, '==', filters[field]);
      }
    });

    const snapshot = await query.get();
    const jobs: Job[] = [];
    snapshot.forEach((doc) => {
      jobs.push({ id: doc.id, ...doc.data() } as Job);
    });
    return jobs;
  }

  async findOne(id: string): Promise<Job> {
    const doc = await this.db.collection('jobs').doc(id).get();
    return { id: doc.id, ...doc.data() } as Job;
  }
}
