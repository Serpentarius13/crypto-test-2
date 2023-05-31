<template>
  <ClientOnly>
    <LazyPagesExchangerPage
      :from-currencies="fromCurrencies"
      :currencies="currencies"
      v-if="!pending"
    />
    <MainExchangerLoadingScreen />
  </ClientOnly>
</template>

<script setup lang="ts">
import { useBasedLazyFetch } from "~/api/useFetch/useBasedLazyFetch";
import { ICurrency, TCurrencyList } from "~/features/types/currency.types";

const { data: fromCurrencies } =
  useBasedLazyFetch<TCurrencyList>("/calculator/from");
const { data: currencies, pending } = await useBasedLazyFetch<ICurrency[]>(
  "/calculator"
);
</script>

<style scoped lang="scss"></style>
