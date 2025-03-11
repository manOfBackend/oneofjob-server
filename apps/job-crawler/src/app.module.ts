import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobCrawlerModule } from './job-crawler/job-crawler.module';
import { ConfigModule } from '@lib/config';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [JobCrawlerModule, ConfigModule.register(), FirebaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
