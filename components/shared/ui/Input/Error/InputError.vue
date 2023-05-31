<template>
  <strong v-if="error" class="text-small">
    {{ error }}
  </strong>
</template>

<script setup lang="ts">
defineProps<{ error: undefined | null | string }>();
</script>

<style scoped lang="scss">
strong {
  color: red;
  font-weight: 700;
}
</style>
