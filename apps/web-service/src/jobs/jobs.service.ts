import { Injectable, Logger } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { Job } from './entities/job.entity';

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  constructor(private readonly firebaseService: FirebaseService) {}

  async findAll(filters: Record<string, string | undefined>): Promise<Job[]> {
    try {
      const result = this.firebaseService.findAll(filters);
      this.logger.log(`Succeeded findAll: ${JSON.stringify(filters)}`);
      return result;
    } catch (error) {
      this.logger.error(`Failed findAll: ${JSON.stringify(filters)}, ${error.message}`);
      throw error;
    }
  }

  async findOne(id: string): Promise<Job> {
    try {
      const result = this.firebaseService.findOne(id);
      this.logger.log(`Succeeded findOne: ${id}`);
      return result;
    } catch (error) {
      this.logger.error(`Failed findOne: ${id}, ${error.message}`);
      throw error;
    }
  }
}
