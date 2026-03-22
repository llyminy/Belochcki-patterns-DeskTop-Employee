import { http } from "./http";
import type { Client, Employee } from "../../types/User";

export const userApi = {
  getClients: () => http.get<Client[]>("/clients"),
  getEmployees: () => http.get<Employee[]>("/employees"),

  getClientById: (id: string) =>
    http.get<Client>(`/clients/${id}`),

  getEmployeeById: (id: string) =>
    http.get<Employee>(`/employees/${id}`),

  createClient: (data: Partial<Client>) =>
    http.post<Client>("/clients", data),

  createEmployee: (data: Partial<Employee>) =>
    http.post<Employee>("/employees", data),

  updateClient: (id: string, data: Partial<Client>) =>
    http.put<Client>(`/clients/${id}`, data),

  updateEmployee: (id: string, data: Partial<Employee>) =>
    http.put<Employee>(`/employees/${id}`, data),

  deleteClient: (id: string) =>
    http.delete(`/clients/${id}`),

  deleteEmployee: (id: string) =>
    http.delete(`/employees/${id}`),

  lockClient: (id: string) =>
    http.put(`/clients/${id}/lock`),

  unlockClient: (id: string) =>
    http.put(`/clients/${id}/unlock`),

  lockEmployee: (id: string) =>
    http.put(`/employees/${id}/lock`),

  unlockEmployee: (id: string) =>
    http.put(`/employees/${id}/unlock`),
};