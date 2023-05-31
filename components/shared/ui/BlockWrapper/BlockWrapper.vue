<template>
  <section class="block">
    <slot />
  </section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.block {
  max-width: 53rem;
  width: 100%;
  min-height: 100%;
  max-height: 93rem;


  background-color: var(--blue-darkest);
  border-radius: var(--radius-medium);
}
</style>
