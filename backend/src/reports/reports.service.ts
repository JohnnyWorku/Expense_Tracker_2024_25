import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { ExpensesService } from '../expenses/expenses.service';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
    private expensesService: ExpensesService,
  ) {}

  async create(report: Report): Promise<Report> {
    return this.reportRepository.save(report);
  }

  async findAll(): Promise<Report[]> {
    return this.reportRepository.find();
  }

  async findOne(id: number): Promise<Report> {
    const report = await this.reportRepository.findOne({ where: { id } });
    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
    return report;
  }

  async update(id: number, report: Report): Promise<Report> {
    await this.reportRepository.update(id, report);
    const updatedReport = await this.reportRepository.findOne({
      where: { id },
    });
    if (!updatedReport) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
    return updatedReport;
  }

  async remove(id: number): Promise<void> {
    const result = await this.reportRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
  }

  async generateReport(
    userId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<any> {
    // Implement logic for generating report based on user ID, start date, and end date
    const totalExpenses = await this.expensesService.getTotalExpenses(
      userId,
      startDate,
      endDate,
    );

    return {
      userId,
      startDate,
      endDate,
      totalExpenses,
    };
  }
}
