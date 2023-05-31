<template>
  <ClientOnly>
    <main class="exchanger">
      <MainExchangerCurrencySelector
        :currencies="store.fromCurrenciesGetter"
        :selected-currency="store.leftCurrency"
        v-if="store.leftCurrency"
        title="Отдаете"
        :handle-set-currency="store.setLeftCurrency"
        :focus-id="FROM_INPUT_ID"
      />

      <MainExchangerCurrencySelector
        :currencies="store.toCurrenciesGetter"
        :selected-currency="store.rightCurrency"
        title="Отдаете"
        :handle-set-currency="store.setRightCurrency"
        :focus-id="TO_INPUT_ID"
      />

      <SharedUiBlockWrapper>
        <MainExchangerForm v-if="store.isCurrenciesLoaded" />
      </SharedUiBlockWrapper>
    </main>
  </ClientOnly>
</template>

<script setup lang="ts">
import { FROM_INPUT_ID, TO_INPUT_ID } from "~/features/constants/inputIDs";
import { ICurrency, TCurrencyList } from "~/features/types/currency.types";
import { useExchangerStore } from "~/stores/useExchangerStore";

interface IExchangerPage {
  fromCurrencies: TCurrencyList | null;
  currencies: ICurrency[] | null;
}

const { currencies, fromCurrencies } = defineProps<IExchangerPage>();

const store = useExchangerStore();
onMounted(() => {
  if (currencies) store.setCurrencies(currencies);

  if (fromCurrencies) store.setFromCurrencies(fromCurrencies);
});
</script>

<style scoped lang="scss">
.exchanger {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 2.4rem;
}
</style>
