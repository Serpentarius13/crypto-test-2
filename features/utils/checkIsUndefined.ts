export const checkIsUndefined = (val: unknown): val is undefined =>
  typeof val === "undefined";
