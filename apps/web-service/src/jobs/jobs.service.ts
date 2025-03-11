import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { Job } from './entities/job.entity';

@Injectable()
export class JobsService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async findAll(filters: Record<string, string | undefined>): Promise<Job[]> {
    return this.firebaseService.findAll(filters);
  }

  async findOne(id: string): Promise<Job> {
    return this.firebaseService.findOne(id);
  }
}
