<template>
  <SharedUiBlockWrapper class="selector">
    <div class="selector__top">
      <h2 class="text-big">
        {{ title }}
      </h2>

      <SharedUiInputTextSearch
        placeholder="Поиск валюты"
        v-model="searchString"
      />
    </div>

    <MainExchangerCurrencySelectorList
      :currencies="searchedCurrencies"
      :selected-currency="selectedCurrency"
      class="selector__bottom"
      :focus-id="focusId"
      :handle-set-currency="handleSetCurrency"
    />
  </SharedUiBlockWrapper>
</template>

<script setup lang="ts">
import { ICurrency, TBoundCurrency } from "~/features/types/currency.types";
import { checkInclusiveStrings } from "~/features/utils/checkInclusiveStrings";

interface ICurrencySelector {
  title: string;
  currencies: ICurrency[];
  selectedCurrency: TBoundCurrency | null;
  handleSetCurrency: (cur: ICurrency) => void;
  focusId?: string;
}

const props = defineProps<ICurrencySelector>();

const searchString = ref<string>("");

const searchedCurrencies = computed<ICurrency[]>(() => {
  return props.currencies.filter((c) =>
    checkInclusiveStrings(searchString.value, [c.name, c.currency[0]])
  );
});
</script>

<style scoped lang="scss">
.selector {
  display: flex;
  flex-direction: column;

  &__top {
    padding: var(--padding-medium);
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    border-top-right-radius: var(--radius-medium);
    border-top-left-radius: var(--radius-medium);

    h2 {
      color: white;
      font-weight: 700;
    }

    background-color: var(--blue-dark);
  }

  &__bottom {
    flex: 1;
    padding: var(--padding-medium);

    border-bottom-right-radius: var(--radius-medium);
    border-bottom-left-radius: var(--radius-medium);
  }
}
</style>
