import { getFormStructure } from "~/api/modules/currency/currency";
import { ICurrency, TCurrencyList } from "~/features/types/currency.types";
import { checkIsObject } from "~/features/utils/checkIsObject";
import { extractCurrencyId } from "~/features/utils/currency/extractCurrencyId";
import { extractStructMinMax } from "~/features/utils/currency/extractStructMinMax";

interface ICurrencyEdge {
  min: number;
  max: number;
}

type TBoundCurrency = Partial<ICurrencyEdge> & ICurrency;

type TCurrencies = Record<number, ICurrency>;

interface IExchangerStore {
  currencies: TCurrencies;
  leftCurrency?: TBoundCurrency | null | undefined;
  rightCurrency?: TBoundCurrency | null | undefined;
  fromCurrencies: TCurrencyList;
  toCurrencies: TCurrencyList;
  isError: boolean;
  isLoading: boolean;
}



export const useExchangerStore = defineStore("exchanger-store", {
  state: (): IExchangerStore => ({
    currencies: {},
    leftCurrency: null,
    rightCurrency: null,

    fromCurrencies: [],
    toCurrencies: [],
    isError: false,
    isLoading: false,
  }),
  actions: {
    setCurrencies(currencies: ICurrency[]) {
      this.currencies = currencies.reduce((acc, cur) => {
        const { ids, ...currency } = cur;
        ids.forEach((id) => {
          acc[id] = { ...currency, ids };
        });
        return acc;
      }, {} as TCurrencies);

      this.leftCurrency = currencies?.[0];
      this.rightCurrency = currencies?.[1];
    },

    getCurrency(id: number) {
      return this.currencies?.[id];
    },

    async getMinimals() {
      if (
        !(checkIsObject(this.leftCurrency) && checkIsObject(this.rightCurrency))
      )
        return;

      try {
        this.load();
        const [leftId, rightId] = [
          extractCurrencyId(this.leftCurrency),
          extractCurrencyId(this.rightCurrency),
        ];
        const { from, to } = await getFormStructure(leftId, rightId);

        const leftBounds = extractStructMinMax(from);
        this.leftCurrency.min = leftBounds[0];
        this.leftCurrency.max = leftBounds[1];

        const rightBounds = extractStructMinMax(to);

        this.rightCurrency.min = rightBounds[0];
        this.rightCurrency.max = rightBounds[1];
      } catch (error) {
        this.isError = true;
      } finally {
        this.unload();
      }
    },
    setLeftCurrency(currency: ICurrency) {
      this.leftCurrency = currency;
      this.getMinimals();
    },

    setRightCurrency(currency: ICurrency) {
      this.rightCurrency = currency;
      this.getMinimals();
    },

    load() {
      this.isLoading = true;
    },
    unload() {
      this.isLoading = false;
    },
  },
  getters: {},
});
