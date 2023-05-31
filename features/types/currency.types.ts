import { IStructInput } from "./form-struct.types";

export interface ICurrencyLogo {
  withBackground: string;
  white: string;
  simple: string;
}

export interface ICurrency {
  ids: number[];
  name: string;
  logo: ICurrencyLogo;
  currency: string[];
  filter: string[];
}

export type TCurrencyList = number[];

interface ICurrencyEdge {
  min: number;
  max: number;
}

export type TBoundCurrency = Partial<ICurrencyEdge> &
  ICurrency & { value: number; inputs?: IStructInput[] };
