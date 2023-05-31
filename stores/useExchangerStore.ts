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
  currentCourse: null | number;
  formValues: Record<string, string>;
  isError: boolean;
  isLoading: boolean;
  acceptRules: boolean;
}

export const useExchangerStore = defineStore("exchanger-store", {
  state: (): IExchangerStore => ({
    currencies: {},
    leftCurrency: null,
    rightCurrency: null,
    fromCurrencies: [],
    toCurrencies: [],
    currentCourse: null,
    isError: false,
    isLoading: false,
    formValues: {},
    acceptRules: false,
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
    async setFromCurrencies(currencies: TCurrencyList) {
      this.fromCurrencies = currencies;

      await this.setLeftCurrency(this.currencies[currencies[0]]);

      await this.setRightCurrency(this.currencies[this.toCurrencies[0]]);
    },

    getCurrency(id: number) {
      return this.currencies?.[id];
    },

    async setLeftCurrency(currency: ICurrency) {
      this.leftCurrency = { ...currency, value: 0 };

      await this.loadReceiving();

      if (!this.rightCurrency) {
        return;
      }

      if (!this.toCurrencies.some((id) => id === this.rightCurrency?.ids[0])) {
        this.rightCurrency = {
          ...this.currencies[this.toCurrencies[0]],
          value: 0,
        };
      }

      this.getMinimals();
    },

    setLeftValue(v: string) {
      if (
        !this.leftCurrency ||
        !this.rightCurrency ||
        !this.currentCourse ||
        checkIsUndefined(this.leftCurrency?.min) ||
        checkIsUndefined(this.leftCurrency?.max) ||
        checkIsUndefined(this.rightCurrency?.min) ||
        checkIsUndefined(this.rightCurrency?.max)
      )
        return;

      const value = parseFloat(v);

      this.leftCurrency.value = value;
      this.rightCurrency.value = value * this.currentCourse;
    },

    setRightValue(v: string) {
      if (
        !this.leftCurrency ||
        !this.rightCurrency ||
        !this.currentCourse ||
        checkIsUndefined(this.leftCurrency?.min) ||
        checkIsUndefined(this.leftCurrency?.max) ||
        checkIsUndefined(this.rightCurrency?.min) ||
        checkIsUndefined(this.rightCurrency?.max)
      )
        return;

      const value = parseFloat(v);

      this.rightCurrency.value = value;
      this.leftCurrency.value = value / this.currentCourse;
    },

    async setRightCurrency(currency: ICurrency) {
      this.rightCurrency = { ...currency, value: 0 };
      await this.getMinimals();
    },

    async getMinimals() {
      if (!this.leftCurrency || !this.rightCurrency) return;

      try {
        this.load();
        const [leftId, rightId] = [
          extractCurrencyId(this.leftCurrency),
          extractCurrencyId(this.rightCurrency),
        ];
        const { from, to, course, structure } = await getFormStructure(
          leftId,
          rightId
        );

        const leftBounds = extractStructMinMax(from);
        this.leftCurrency.min = leftBounds[0];
        this.leftCurrency.max = leftBounds[1];

        this.leftCurrency.inputs = structure.from.input;

        const rightBounds = extractStructMinMax(to);

        this.rightCurrency.min = rightBounds[0];
        this.rightCurrency.max = rightBounds[1];

        this.rightCurrency.inputs = structure.to.input;

        this.currentCourse = course;

        const formValues = this.makeFormValues();

        this.formValues = formValues;
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

    makeFormValues() {
      if (!this.leftCurrency?.inputs || !this.rightCurrency?.inputs) return {};
      return [...this.leftCurrency.inputs, ...this.rightCurrency.inputs].reduce(
        (acc, cur) => {
          if (cur.receive.visible) acc[cur.name] = "";
          return acc;
        },
        {} as Record<string, string>
      );
    },
  },
  getters: {
    fromCurrenciesGetter(state): ICurrency[] {
      return state.fromCurrencies.map((id) => state.currencies[id]);
    },
    toCurrenciesGetter(state): ICurrency[] {
      return state.toCurrencies.map((id) => state.currencies[id]);
    },

    isCurrenciesLoaded(state): boolean {
      return (
        !!Object.keys(state.currencies).length &&
        !!this.rightCurrency &&
        !!this.leftCurrency
      );
    },

    isFormValid(state) {
      if (!state.leftCurrency?.inputs || !state.rightCurrency?.inputs)
        return false;

      const form = state.formValues;

      const inputs = [
        ...state.leftCurrency?.inputs,
        ...state.rightCurrency?.inputs,
      ];

      const patterns = inputs.reduce((acc, cur) => {
        acc[cur.name] = new RegExp(cur.regex);
        return acc;
      }, {} as Record<string, RegExp>);

      const isValid = Object.keys(form).every(
        (k) => patterns[k]?.test(form[k]) && form[k] !== ""
      );

      return isValid && state.acceptRules;
    },
  },
});
