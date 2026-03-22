import { http } from "./http.ts";
import type {
  CreditTariff,
  CreditTariffRequest,
  CreditTariffPageResponse,
} from "../../types/CreditTariff";

export const creditTariffApi = {
  getAll: (params?: any) =>
    http.get<CreditTariffPageResponse>("/creditTariff/getAll", { params }),

  getById: (id: string) =>
    http.get<CreditTariff>(`/creditTariff/getById/${id}`),

  create: (data: CreditTariffRequest) =>
    http.post<CreditTariff>("/creditTariff/create", data),

  update: (id: string, data: CreditTariffRequest) =>
    http.put<CreditTariff>(`/creditTariff/update/${id}`, data),

  delete: (id: string) =>
    http.delete(`/creditTariff/delete/${id}`, {
      data: { token: localStorage.getItem("accessToken") },
    }),
};