import { Controller, Get, Param } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Get('budget/:userId')
  async getBudgetNotifications(@Param('userId') userId: number) {
    return this.notificationsService.checkBudgetProgress(userId);
  }

  @Get('tips')
  async getFinancialTips() {
    return this.notificationsService.provideFinancialTips();
  }
}
