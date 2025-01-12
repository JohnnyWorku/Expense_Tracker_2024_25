import { Controller, Get, Res, Query } from '@nestjs/common';
import { ExportsService } from './exports.service';
import { ExpensesService } from '../expenses/expenses.service';
import { Response } from 'express';

@Controller('exports')
export class ExportsController {
  constructor(
    private exportsService: ExportsService,
    private expensesService: ExpensesService,
  ) {}

  @Get('csv')
  async exportCSV(@Query('userId') userId: number, @Res() res: Response) {
    const expenses = await this.expensesService.findAll();
    const filePath = await this.exportsService.exportToCSV(expenses);
    res.download(filePath);
  }

  @Get('pdf')
  async exportPDF(@Query('userId') userId: number, @Res() res: Response) {
    const expenses = await this.expensesService.findAll();
    const filePath = await this.exportsService.exportToPDF(expenses);
    res.download(filePath);
  }
}
