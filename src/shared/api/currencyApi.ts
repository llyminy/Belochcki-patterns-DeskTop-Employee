import { http } from "./http";
import type { Currency, CreateCurrencyRequest} from "../../types/Currency";

export const currencyApi = {
  getAll: async (): Promise<Currency[]> => {
    const res = await http.get<Currency[]>("/gateway/accounts/currencies");
    return res;
  },

  create: async (data: CreateCurrencyRequest): Promise<Currency> => {
    const res = await http.post<Currency>("/gateway/accounts/currencies", data);
    return res;
  },

  deactivate: async (code: string): Promise<Currency> => {
    const res = await http.put<Currency>(`/gateway/accounts/currencies/${code}/deactivate`);
    return res;
  },
};