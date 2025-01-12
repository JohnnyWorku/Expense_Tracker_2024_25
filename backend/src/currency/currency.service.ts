import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CurrencyService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async convertCurrency(
    amount: number,
    fromCurrency: string,
    toCurrency: string,
  ): Promise<number> {
    const apiKey = this.configService.get<string>('EXCHANGE_RATE_API_KEY');
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`;

    const response = await this.httpService.get(url).toPromise();
    const conversionRate = response.data.conversion_rate;

    return amount * conversionRate;
  }

  async getConversionRate(
    fromCurrency: string,
    toCurrency: string,
  ): Promise<number> {
    const apiKey = this.configService.get<string>('EXCHANGE_RATE_API_KEY');
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`;

    const response = await this.httpService.get(url).toPromise();
    return response.data.conversion_rate;
  }
}
