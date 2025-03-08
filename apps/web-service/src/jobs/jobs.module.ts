import { Module } from '@nestjs/common';
import { FirebaseModule } from '../firebase/firebase.module';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';

@Module({
  imports: [FirebaseModule],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
