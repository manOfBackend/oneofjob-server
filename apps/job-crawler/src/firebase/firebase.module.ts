import { FirebaseCoreModule } from '@lib/firebase';
import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Module({
  imports: [FirebaseCoreModule],
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}
