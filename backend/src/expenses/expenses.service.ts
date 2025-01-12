import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, Between } from 'typeorm';
import { Expense } from './expense.entity';
import { CurrencyService } from '../currency/currency.service';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private expensesRepository: Repository<Expense>,
    private currencyService: CurrencyService, // Inject CurrencyService here
  ) {}

  async create(expense: Expense): Promise<Expense> {
    return this.expensesRepository.save(expense);
  }

  async findAll(): Promise<Expense[]> {
    return this.expensesRepository.find();
  }

  async findOne(id: number): Promise<Expense> {
    return this.expensesRepository.findOne({ where: { id } });
  }

  async findByCategory(category: string): Promise<Expense[]> {
    return this.expensesRepository.find({ where: { category } });
  }

  async update(id: number, expense: Expense): Promise<Expense> {
    await this.expensesRepository.update(id, expense);
    const updatedExpense = await this.expensesRepository.findOne({
      where: { id },
    });
    if (!updatedExpense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
    return updatedExpense;
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.expensesRepository.delete(id);
  }

  async addExpense(expense: Expense): Promise<Expense> {
    const convertedAmount = await this.currencyService.convertCurrency(
      expense.amount,
      expense.currency,
      'USD',
    );
    expense.amount = convertedAmount;
    expense.currency = 'USD';
    return this.expensesRepository.save(expense);
  }

  async getTotalExpenses(
    userId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<number> {
    const expenses = await this.expensesRepository.find({
      where: {
        user: { id: userId },
        date: Between(startDate, endDate),
      },
    });

    const total = await Promise.all(
      expenses.map(async (expense) => {
        const convertedAmount = await this.currencyService.convertCurrency(
          expense.amount,
          expense.currency,
          'USD',
        );
        return convertedAmount;
      }),
    );

    return total.reduce((sum, amount) => sum + amount, 0);
  }
}
