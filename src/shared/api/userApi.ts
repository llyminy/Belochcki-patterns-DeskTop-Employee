import { http } from "./http";
import type { Client, Employee} from "../../types/User";

export const userApi = {
  getClients: () => http.get<Client[]>("/clients"),
  getEmployees: () => http.get<Employee[]>("/employees"),

  deleteClient: (id: string) => http.delete(`/clients/${id}`),
  deleteEmployee: (id: string) => http.delete(`/employees/${id}`),

  lockClient: (id: string) => http.put(`/clients/${id}/lock`),
  unlockClient: (id: string) => http.put(`/clients/${id}/unlock`),

  lockEmployee: (id: string) => http.put(`/employees/${id}/lock`),
  unlockEmployee: (id: string) => http.patch(`/employees/${id}/unlock`),
};