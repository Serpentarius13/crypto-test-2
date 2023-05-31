<template>
  <Teleport to="body">
    <SharedUiLoadingScreen
      :is-loading="store.isLoading || !store.isCurrenciesLoaded"
    />
  </Teleport>
</template>

<script setup lang="ts">
import { useExchangerStore } from "~/stores/useExchangerStore";

const store = useExchangerStore();
</script>

<style scoped lang="scss"></style>
