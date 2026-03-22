import { http } from "./http";
import type { ClientCredit, CreditOperation, CreditDebt, PageResponse } from "../../types/Credit";

export const creditApi = {
  getAll: () =>
    http.get<PageResponse<ClientCredit>>("/clientCredit/getAll"),

  getById: (id: string) =>
    http.get<ClientCredit>(`/clientCredit/getById/${id}`),

  getCreditRating: (id: string) =>
    http.get<number>(`/clients/credit-rating`, { params: { id } }),

  getDebts: (clientId: string) =>
    http.get<CreditDebt[]>(`/clientDebts`, { params: { clientId } }),

  getOperations: (creditId: string) =>
    http.get<PageResponse<CreditOperation[]>>(
      `/creditOperationHistory/getAll`,
      { params: { clientCreditId: creditId } }
    ),
};