<template>
  <div class="list__wrapper">
    <ul class="list" role="list">
      <li v-for="cur in currencies" :key="cur.name">
        <button @click="handleSetCurrency(cur)">
          <SharedUiCurrencyItem
            :logo="cur.logo"
            :name="cur.name"
            :currency="cur.currency"
            v-if="cur.name !== selectedCurrency?.name"
          />

          <div class="list__selected" v-else>
            <div class="list__selected-rect">
              <NuxtIcon name="arrow" />
            </div>

            <SharedUiCurrencyItem
              :logo="cur.logo"
              :name="cur.name"
              :currency="cur.currency"
            />
          </div>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ICurrency, TBoundCurrency } from "~/features/types/currency.types";
import { useExchangerStore } from "~/stores/useExchangerStore";

interface ICurrencySelectorList {
  currencies: ICurrency[];
  selectedCurrency: TBoundCurrency | null;
  handleSetCurrency: (cur: ICurrency) => void;
}

const props = defineProps<ICurrencySelectorList>();
</script>

<style scoped lang="scss">
@import "~/styles/utils/mixins.scss";
.list {
  display: flex;
  flex-direction: column;

  gap: 1.5rem;

  @include scrollbar(var(--scroll-color));

  overflow-y: auto;
  max-height: 60vh;

  button {
    text-align: left;
  }

  &__wrapper {
    padding: var(--padding-medium);
    padding-right: 1.5rem !important;
    background-color: var(--blue-darkest);
    width: 100%;
    max-height: 60vh;
    overflow-y: hidden;
  }

  &__selected {
    padding: 1.3rem;
    display: flex;
    align-items: center;

    gap: 1.5rem;

    border-radius: var(--radius-small);

    background-color: var(--blue-dark);

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
