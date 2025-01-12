import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { Expense } from './expense.entity';
import { CurrencyModule } from '../currency/currency.module'; // Import CurrencyModule

@Module({
  imports: [TypeOrmModule.forFeature([Expense]), CurrencyModule], // Include CurrencyModule in imports
  providers: [ExpensesService],
  controllers: [ExpensesController],
  exports: [ExpensesService, TypeOrmModule], // Export ExpensesService and TypeOrmModule for Expense
})
export class ExpensesModule {}
