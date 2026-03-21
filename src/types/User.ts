export type Status = "ACTIVE" | "BLOCKED";

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