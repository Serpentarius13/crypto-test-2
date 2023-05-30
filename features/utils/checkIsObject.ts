export const checkIsObject = (value: unknown): value is object =>
  typeof value === "object" && !Array.isArray(value) && value !== null;
