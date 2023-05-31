<template>
  <button
    :class="['button', ButtonSizes[size], ButtonThemes[theme]]"
    type="button"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { ButtonThemes, ButtonSizes } from "./buttonThemes";

interface IButton {
  size?: keyof typeof ButtonSizes;
  theme?: keyof typeof ButtonThemes;
}

const props = withDefaults(defineProps<IButton>(), {
  size: "medium",
  theme: "filled",
});
</script>

<style scoped lang="scss">
.button {
  transition: 0.25s;
  width: fit-content;

  outline-color: white;

  border: 1px solid;
  // Size

  &.medium {
    padding: 1.8rem 2.8rem;
    border-radius: var(--radius-medium);
  }

  &.filled {
    background-color: var(--blue);
    color: white;
    border-color: var(--blue);

    &:hover {
      background-color: transparent;
    }
  }

  &.outline {
    background-color: transparent;
    color: white;
    border-color: var(--blue);

    &:hover {
      background-color: var(--blue);
    }
  }

  &:disabled {
    background-color: var(--gray);
    color: black;
    cursor: default;

    &:hover {
      background-color: var(--gray);
      color: black;
    }
  }
}
</style>
