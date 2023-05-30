<template>
  <SharedUiInputText icon="mail" placeholder="ФИО Получателя" />
  <SharedUiInputTextSearch placeholder="Search" />
</template>

<script setup lang="ts">
import { useBasedLazyFetch } from "~/api/useFetch/useBasedLazyFetch";
import { ICurrency } from "~/features/types/currency.types";
import { useExchangerStore } from "~/stores/useExchangerStore";
const store = useExchangerStore();
const { data, pending } = await useBasedLazyFetch<ICurrency[]>("/calculator", {
  onResponse(data) {
    store.setCurrencies(data.response._data);
  },
});
</script>

<style scoped lang="scss"></style>
