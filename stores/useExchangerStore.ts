import {
  getFormStructure,
  getReceivingCurrencies,
} from "~/api/modules/currency/currency";
import {
  ICurrency,
  TBoundCurrency,
  TCurrencyList,
} from "~/features/types/currency.types";
import { checkIsUndefined } from "~/features/utils/checkIsUndefined";

import { extractCurrencyId } from "~/features/utils/currency/extractCurrencyId";
import { extractStructMinMax } from "~/features/utils/currency/extractStructMinMax";

type TCurrencies = Record<number, ICurrency>;

interface IExchangerStore {
  currencies: TCurrencies;
  leftCurrency: TBoundCurrency | null;
  rightCurrency: TBoundCurrency | null;
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
          // Один битый айдишник биткоина

          acc[id] = { ...currency, ids };
        });

        return acc;
      }, {} as TCurrencies);
    },
    setFromCurrencies(currencies: TCurrencyList) {
      this.fromCurrencies = currencies;

      this.setLeftCurrency(this.currencies[currencies[0]]).then(() =>
        this.setRightCurrency(this.currencies[this.toCurrencies[0]])
      );
    },

    getCurrency(id: number) {
      return this.currencies?.[id];
    },

    setLeftValue(v: string) {
      if (checkIsUndefined(this.leftCurrency?.value) || !this.leftCurrency)
        return;
      const parsed = parseFloat(v);
      this.leftCurrency.value = parsed;
    },

    setRightValue(v: string) {
      if (checkIsUndefined(this.rightCurrency?.value) || !this.rightCurrency)
        return;
      const parsed = parseFloat(v);
      this.rightCurrency.value = parsed;
    },

    async setLeftCurrency(currency: ICurrency) {
      this.leftCurrency = { ...currency, value: 0 };

      await this.loadReceiving();

      if (!this.rightCurrency) {
        return;
      }

      if (!this.toCurrencies.some((id) => id === this.rightCurrency?.ids[0])) {
        this.rightCurrency = null;
      } else {
        this.getMinimals();
      }
    },

    setRightCurrency(currency: ICurrency) {
      this.rightCurrency = { ...currency, value: 0 };
      this.getMinimals();
    },

    async getMinimals() {
      if (!this.leftCurrency || !this.rightCurrency) return;

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

    async loadReceiving() {
      if (!this.leftCurrency) return;
      try {
        this.load();

        const receivingCurrencies = await getReceivingCurrencies(
          this.leftCurrency.ids[0]
        );

        this.toCurrencies = receivingCurrencies.filter(
          (id) => !this.leftCurrency?.ids.includes(id)
        );
      } catch (error) {
        this.isError = true;
      } finally {
        this.unload();
      }
    },

    load() {
      this.isLoading = true;
    },
    unload() {
      setTimeout(() => {
        this.isLoading = false;
      }, 300);
    },
  },
  getters: {
    fromCurrenciesGetter(state) {
      return state.fromCurrencies.map((id) => state.currencies[id]);
    },
    toCurrenciesGetter(state) {
      return state.toCurrencies.map((id) => state.currencies[id]);
    },

    isCurrenciesLoaded(state) {
      return Object.keys(state.currencies).length;
    },

    isOutOfBounds(state) {
      const [left, right] = [state.leftCurrency, state.rightCurrency];
      console.log("hereS");
      if (
        !left ||
        !right ||
        checkIsUndefined(left.min) ||
        checkIsUndefined(right.min) ||
        checkIsUndefined(left.max) ||
        checkIsUndefined(right.max)
      )
        return true;

      console.log("here");

      if (left.value < left.min || left.value > left.max) return true;
      if (right.value < right.min || right.value > right.max) return true;

      console.log("here");
      return false;
    },
  },
});
