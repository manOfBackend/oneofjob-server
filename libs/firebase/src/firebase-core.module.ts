import { Module } from '@nestjs/common';
import { FirebaseCoreService } from './firebase-core.service';

@Module({
  providers: [FirebaseCoreService],
  exports: [FirebaseCoreService],
})
export class FirebaseCoreModule {}
