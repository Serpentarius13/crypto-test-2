import { ICurrency } from "../../types/currency.types";

export const extractCurrencyId = (currency: ICurrency): number =>
  currency.ids[0];
