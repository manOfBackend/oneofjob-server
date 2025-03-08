import { Injectable } from '@nestjs/common';

@Injectable()
export class JobsService {
  findAll() {
    return `This action returns all jobs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} job`;
  }
}
