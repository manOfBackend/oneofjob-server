import { Controller, Get, Param, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  async findAll(
    @Query('career') career?: string,
    @Query('company') company?: string,
    @Query('employmentType') employmentType?: string,
    @Query('period') period?: string,
    @Query('title') title?: string,
    @Query('url') url?: string,
  ) {
    return this.jobsService.findAll({
      career,
      company,
      employmentType,
      period,
      title,
      url,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }
}
