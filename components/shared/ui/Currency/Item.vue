<template>
  <figure class="currency">
    <img :src="logo.simple" :alt="`Лого ${name}`" />

    <div>
      <h6 class="text-smaller">
        {{ name }}
      </h6>

      <span class="text-smallest">
        {{ currency?.[0] }}
      </span>
    </div>
  </figure>
</template>

<script setup lang="ts">
import { ICurrency } from "~/features/types/currency.types";

type ICurrencyItem = Pick<ICurrency, "logo" | "name" | "currency">;

const props = defineProps<ICurrencyItem>();
</script>

<style scoped lang="scss">
.currency {
  display: flex;
  gap: 1rem;
  align-items: center;

  img {
    width: 2.4rem;
    aspect-ratio: 1;
  }

  h6 {
    color: white;
  }

  span {
    color: var(--gray);
    text-transform: uppercase;
  }
}
</style>
