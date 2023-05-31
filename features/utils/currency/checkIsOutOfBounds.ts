import { TBoundCurrency } from "~/features/types/currency.types";
import { checkIsUndefined } from "../checkIsUndefined";

export const checkIsOutOfBounds = (
  currency: TBoundCurrency | null,
  value: number | string
) => {
  if (
    !currency ||
    checkIsUndefined(currency?.min) ||
    checkIsUndefined(currency?.max)
  )
    return true;
  if (typeof value === "string") value = parseFloat(value);
  return value < currency.min || value > currency.max;
};
