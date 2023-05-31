<template>
  <label class="search text-small">
    <span v-if="label"> {{ label }} </span>

    <div>
      <NuxtIcon v-if="icon" :name="icon" class="icon" />

      <input
        type="text"
        :placeholder="placeholder"
        :style="{ paddingLeft: icon ? '6.4rem' : '' }"
        v-bind="$attrs"
        v-model="model"
      />
    </div>
  </label>
</template>

<script setup lang="ts">
interface IInputText {
  label?: string;
  icon?: string;
  placeholder: string;
}

const props = defineProps<IInputText>();

const model = defineModel<string>({ required: true });
</script>

<style scoped lang="scss">
.search {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  width: 100%;

  span {
    color: white;
  }

  div {
    color: var(--gray);
    position: relative;

    input {
      width: 100%;
      padding: 2.5rem 2rem;
      background-color: var(--blue-dark);
      border-radius: var(--radius-small);
      color: inherit;

      &:focus {
        outline-color: white;
      }
    }

    .icon {
      position: absolute;
      left: 2.5rem;
      top: 50%;
      transform: translateY(-50%);
      width: 2.4rem;
      aspect-ratio: 1;
      color: inherit;
    }
  }
}
</style>
