import { axiosInstance } from "~/api/axiosInstance";
import { ICurrency, TCurrencyList } from "~/features/types/currency.types";
import { IFormStruct } from "~/features/types/form-struct.types";

export async function getAllCurrencies() {
  const { data } = await axiosInstance.get<ICurrency[]>("/calculator");

  return data;
}

export async function getGivingCurrencies() {
  const { data } = await axiosInstance.get<TCurrencyList>("/calculator/from");

  return data;
}

export async function getReceivingCurrencies(currencyId: number) {
  const { data } = await axiosInstance.get<TCurrencyList>(
    `/calculator/from/${currencyId}`
  );
  return data;
}

export async function getFormStructure(leftCurId: number, rightCurId: number) {
  const { data } = await axiosInstance.get<IFormStruct>(
    `/calculator/pair/${leftCurId}/${rightCurId}`
  );

  return data;
}
