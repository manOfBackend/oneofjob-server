import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), JobsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
