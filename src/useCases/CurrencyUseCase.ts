import { currencyApi } from "../shared/api/currencyApi";
import type { Currency, CreateCurrencyRequest } from "../types/Currency";

export const currencyUseCase = {
  getCurrencies: (): Promise<Currency[]> => {
    return currencyApi.getAll();
  },

  createCurrency: (data: CreateCurrencyRequest): Promise<Currency> => {
    return currencyApi.create(data);
  },

  deactivateCurrency: (code: string): Promise<Currency> => {
    return currencyApi.deactivate(code);
  },
};