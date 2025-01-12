import { Module } from '@nestjs/common';
import { OfflineService } from './offline.service';
import { OfflineController } from './offline.controller';
import { ExpensesModule } from '../expenses/expenses.module'; // Import ExpensesModule

@Module({
  imports: [ExpensesModule], // Include ExpensesModule in imports
  providers: [OfflineService],
  controllers: [OfflineController],
})
export class OfflineModule {}
