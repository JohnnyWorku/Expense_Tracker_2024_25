import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { ExpensesModule } from '../expenses/expenses.module'; // Import ExpensesModule
import { CurrencyModule } from '../currency/currency.module'; // Import CurrencyModule for completeness

@Module({
  imports: [TypeOrmModule.forFeature([Report]), ExpensesModule, CurrencyModule], // Include necessary modules
  providers: [ReportsService],
  controllers: [ReportsController],
})
export class ReportsModule {}
