import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { Expense } from './expense.entity';
import { DeleteResult } from 'typeorm';

@Controller('expenses')
export class ExpensesController {
  constructor(private expensesService: ExpensesService) {}

  @Get()
  async findAll(): Promise<Expense[]> {
    return this.expensesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Expense> {
    const expense = await this.expensesService.findOne(Number(id));
    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
    return expense;
  }

  @Get('category/:category')
  async findByCategory(
    @Param('category') category: string,
  ): Promise<Expense[]> {
    return this.expensesService.findByCategory(category);
  }

  @Post()
  async create(@Body() expense: Expense): Promise<Expense> {
    return this.expensesService.create(expense);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() expense: Expense,
  ): Promise<Expense> {
    const updatedExpense = await this.expensesService.update(
      Number(id),
      expense,
    );
    if (!updatedExpense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
    return updatedExpense;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const result: DeleteResult = await this.expensesService.remove(Number(id));
    if (result.affected === 0) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
  }
}
