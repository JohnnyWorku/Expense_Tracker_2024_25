import {
  Controller,
  Get,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get('generate')
  async generateReport(
    @Query('userId') userId: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    const report = await this.reportsService.generateReport(
      Number(userId),
      new Date(startDate),
      new Date(endDate),
    );
    if (!report) {
      throw new NotFoundException(`Report for user ${userId} not found`);
    }
    return report;
  }
}
