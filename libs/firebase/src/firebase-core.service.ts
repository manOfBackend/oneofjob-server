import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseCoreService implements OnModuleInit {
  private readonly logger = new Logger(FirebaseCoreService.name);

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    this.initializeFirebase();
  }

  private initializeFirebase() {
    // Firebase가 이미 초기화되었는지 확인
    if (!admin.apps.length) {
      try {
        const credentialBase64 = this.configService.getOrThrow<string>(
          'FIREBASE_CREDENTIAL_BASE64',
        );
        const databaseURL = this.configService.getOrThrow<string>('FIREBASE_DATABASE_URL');

        const credential = Buffer.from(credentialBase64, 'base64').toString('utf8');
        const serviceAccount = JSON.parse(credential);

        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          databaseURL: databaseURL,
        });
        this.logger.log('Firebase 초기화 완료');
      } catch (error) {
        this.logger.error(`Firebase 초기화 실패: ${error.message}`);
        throw error;
      }
    }
  }

  getApp(): admin.app.App {
    return admin.app();
  }
}
