<template>
  <ClientOnly>
    <span
      class="loader"
      :style="{ width: `${size}px`, borderWidth: `${Math.round(+size / 8)}px` }"
    />
  </ClientOnly>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: number | string;
    duration?: number | string;
  }>(),
  { duration: 1000, size: 48 }
);
</script>

<style scoped lang="scss">
.loader {
  display: block;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1px solid transparent;
  border-bottom-color: white !important;

  --duration: v-bind(props.duration);
  animation: rotate linear infinite;
  animation-duration: calc(var(--duration) * 1ms);
}

@keyframes rotate {
  from {
    transform: rotate(0turn);
  }
  to {
    transform: rotate(1turn);
  }
}
</style>
