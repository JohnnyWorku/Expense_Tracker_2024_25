import { Controller, Get, Query } from '@nestjs/common';
import { CurrencyService } from './currency.service';

@Controller('currency')
export class CurrencyController {
  constructor(private currencyService: CurrencyService) {}

  @Get('convert')
  async convertCurrency(
    @Query('amount') amount: number,
    @Query('from') fromCurrency: string,
    @Query('to') toCurrency: string,
  ) {
    return this.currencyService.convertCurrency(
      amount,
      fromCurrency,
      toCurrency,
    );
  }

  @Get('rate')
  async getConversionRate(
    @Query('from') fromCurrency: string,
    @Query('to') toCurrency: string,
  ) {
    return this.currencyService.getConversionRate(fromCurrency, toCurrency);
  }
}
