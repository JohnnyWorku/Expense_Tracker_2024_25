import { Controller, Post, Body } from '@nestjs/common';
import { OfflineService } from './offline.service';
import { Expense } from '../expenses/expense.entity';

@Controller('offline')
export class OfflineController {
  constructor(private offlineService: OfflineService) {}

  @Post('sync')
  async syncExpenses(@Body() expenses: Expense[]) {
    await this.offlineService.syncExpenses(expenses);
  }
}
