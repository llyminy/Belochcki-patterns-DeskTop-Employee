export type Status = "LOCKED" | "UNLOCKED";

export interface Client {
  id: string;
  name: string;
  login: string;
  status: Status;
  creditRating: number;
}

export interface Employee {
  id: string;
  name: string;
  login: string;
  status: Status;
}

export type User = Client | Employee;