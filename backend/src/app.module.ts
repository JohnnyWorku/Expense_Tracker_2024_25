import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ExpensesModule } from './expenses/expenses.module';
import { ReportsModule } from './reports/reports.module';
import { CurrencyModule } from './currency/currency.module';
import { User } from './users/user.entity';
import { Expense } from './expenses/expense.entity';
import { Budget } from './budgets/budget.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'JohnWo@672427',
      database: process.env.DB_DATABASE || 'expense_tracker_app',
      entities: [User, Expense, Budget],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ExpensesModule,
    ReportsModule,
    CurrencyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
