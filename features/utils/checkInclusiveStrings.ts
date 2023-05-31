export const checkInclusiveStrings = (str: string, strs: string[]) =>
  strs.some((s) => s.toLowerCase().includes(str.toLowerCase()));
