<template>
  <figure class="currency-logo">
    <img :src="logo.simple" :alt="`Лого ${name}`" />
    <figcaption class="text-small">{{ name }}</figcaption>
  </figure>
</template>

<script setup lang="ts">
interface ICurrencyLogo extends Pick<ICurrency, "logo" | "name"> {}

const props = defineProps<ICurrencyLogo>();
</script>

<style scoped lang="scss">
.currency-logo {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
  img {
    width: 3.2rem;
    aspect-ratio: 1;
  }
}
</style>
