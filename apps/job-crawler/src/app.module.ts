import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobCrawlerModule } from './job-crawler/job-crawler.module';
import { FirebaseModule } from './firebase/firebase.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), JobCrawlerModule, FirebaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
