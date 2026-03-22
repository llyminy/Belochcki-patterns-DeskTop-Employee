export interface Currency {
  code: string;
  name: string;
  symbol?: string;
  isActive: boolean;
}

export interface CreateCurrencyRequest {
  code: string;
  name: string;
  symbol?: string;
}

export interface Array<T>{
    data: T[];
}