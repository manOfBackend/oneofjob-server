import { Controller, Get, Param, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { Career, Company, EmploymentType } from 'src/jobs/entities/job.enums';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  async findAll(
    @Query('career') career?: Career,
    @Query('company') company?: Company,
    @Query('employmentType') employmentType?: EmploymentType,
  ) {
    return this.jobsService.findAll({
      career,
      company,
      employmentType,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }
}
