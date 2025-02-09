import { Injectable } from '@nestjs/common';
import { ExpensesService } from '../expenses/expenses.service';
import { Expense } from '../expenses/expense.entity';

@Injectable()
export class OfflineService {
  constructor(private expensesService: ExpensesService) {}

  async syncExpenses(expenses: Expense[]): Promise<void> {
    try {
      for (const expense of expenses) {
        await this.expensesService.create(expense);
      }
    } catch (error) {
      console.error('Error syncing expenses:', error);
    }
  }
}
