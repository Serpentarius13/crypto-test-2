import { IStructDirection } from "~/features/types/form-struct.types";

export const extractStructMinMax = (
  direction: IStructDirection
): [number, number] => [direction.min, direction.max];
