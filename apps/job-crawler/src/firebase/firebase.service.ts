import { FirebaseCoreService } from '@lib/firebase';
import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private readonly logger = new Logger(FirebaseService.name);
  private readonly db: admin.firestore.Firestore;

  constructor(private readonly firebaseCoreService: FirebaseCoreService) {
    const app = this.firebaseCoreService.getApp();
    this.db = app.firestore();
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
