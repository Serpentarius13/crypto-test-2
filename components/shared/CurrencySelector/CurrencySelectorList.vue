<template>
  <ul class="selector-list" role="list">
    <li v-for="{ currency, logo, name } in currencies" :key="name">
      <SharedUiCurrencyItem
        :logo="logo"
        :name="name"
        :currency="currency"
        v-if="name !== selectedCurrency.name"
      />

      <button class="list__selected" v-else>
        <div class="list__selected-rect">
          <NuxtIcon name="arrow" />
        </div>

        <SharedUiCurrencyItem :logo="logo" :name="name" :currency="currency" />
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ICurrency } from "~/features/types/currency.types";

interface ICurrencySelectorList {
  currencies: ICurrency[];
  selectedCurrency: ICurrency;
}

const props = defineProps<ICurrencySelectorList>();
</script>

<style scoped lang="scss">
@import "~/styles/utils/mixins.scss";
.list {
  display: flex;
  flex-direction: column;

  gap: 1.5rem;
  width: 100%;
  padding: 3rem;

  max-height: 100%;

  background-color: var(--blue-darkest);

  @include scrollbar(var(--scroll-color));

  &__selected {
    padding: 1.3rem;
    display: flex;
    align-items: center;

    border-radius: var(--radius-small);

    &-rect {
      width: 2.6rem;
      aspect-ratio: 1;

      display: grid;
      place-items: center;
      color: white;
      background-color: var(--blue);
    }
  }
}
</style>
