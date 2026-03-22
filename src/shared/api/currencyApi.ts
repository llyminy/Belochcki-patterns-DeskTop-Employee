import { http } from "./http";
import type { Currency, CreateCurrencyRequest} from "../../types/Currency";

export const currencyApi = {
  getAll: async (): Promise<Currency[]> => {
    const res = await http.get<Currency[]>("/currencies");
    return res;
  },

  create: async (data: CreateCurrencyRequest): Promise<Currency> => {
    const res = await http.post<Currency>("/currencies", data);
    return res;
  },

  deactivate: async (code: string): Promise<Currency> => {
    const res = await http.patch<Currency>(`/currencies/${code}/deactivate`);
    return res;
  },
};