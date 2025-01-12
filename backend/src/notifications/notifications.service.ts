import { Injectable } from '@nestjs/common';
import { ExpensesService } from '../expenses/expenses.service';
import { BudgetsService } from '../budgets/budgets.service';

@Injectable()
export class NotificationsService {
  constructor(
    private expensesService: ExpensesService,
    private budgetsService: BudgetsService,
  ) {}

  async checkBudgetProgress(userId: number): Promise<any> {
    const budgets = await this.budgetsService.findAll(userId);
    const notifications = [];

    for (const budget of budgets) {
      const totalExpenses = await this.expensesService.getTotalExpenses(
        userId,
        budget.startDate,
        budget.endDate,
      );
      const remainingBudget = budget.amount - totalExpenses;

      if (remainingBudget < 0) {
        notifications.push({
          message: `You have exceeded your ${budget.period} budget by ${-remainingBudget}. Consider adjusting your spending.`,
        });
      } else {
        notifications.push({
          message: `You are doing great! You have ${remainingBudget} left in your ${budget.period} budget.`,
        });

        // Reward points for staying under budget
        if (budget.period === 'monthly') {
          notifications.push({
            message:
              'Congratulations! You have earned 100 points for staying within your monthly budget.',
          });
        }
      }
    }

    return notifications;
  }

  async provideFinancialTips(): Promise<string[]> {
    // Generate personalized financial tips based on user data
    return [
      'Track your spending regularly to avoid overspending.',
      'Set realistic budget goals and stick to them.',
      'Review and adjust your budget periodically.',
      'Consider saving a portion of your income each month.',
    ];
  }
}
