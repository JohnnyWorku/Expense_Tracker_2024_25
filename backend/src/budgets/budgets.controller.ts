import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { ExpensesService } from '../expenses/expenses.service';

@Controller('budgets')
export class BudgetsController {
  constructor(
    private budgetsService: BudgetsService,
    private expensesService: ExpensesService,
  ) {}

  @Get('progress/:userId')
  async getBudgetProgress(@Param('userId') userId: string) {
    const userIdNumber = Number(userId);
    const budgets = await this.budgetsService.findAll(userIdNumber);
    const progress = [];

    for (const budget of budgets) {
      const totalExpenses = await this.expensesService.getTotalExpenses(
        userIdNumber,
        budget.startDate,
        budget.endDate,
      );
      const remainingBudget = budget.amount - totalExpenses;

      progress.push({
        budget,
        totalExpenses,
        remainingBudget,
      });
    }

    return progress;
  }
}
