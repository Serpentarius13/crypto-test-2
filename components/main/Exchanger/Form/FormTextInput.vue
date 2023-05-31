<template>
  <label class="search text-small">
    <span v-if="label"> {{ label }} </span>

    <div>
      <NuxtIcon v-if="icon" :name="icon" class="icon" />

      <input
        :placeholder="placeholder"
        :style="{ paddingLeft: icon ? '6.4rem' : '' }"
        v-model="model"
        :type="type ?? 'text'"
        @input="handleInput"
        :class="[errorValue && 'error']"
      />
    </div>

    <SharedUiInputError :error="errorValue" />
  </label>
</template>

<script setup lang="ts">
import { InputHTMLAttributes } from "vue";

interface IInputText {
  label?: string;
  icon?: string;
  error?: string;
  pattern?: InputHTMLAttributes["pattern"];
  type?: InputHTMLAttributes["type"];
  placeholder?: InputHTMLAttributes["placeholder"];
}

const { label, icon, placeholder, type, pattern, error } =
  defineProps<IInputText>();

const model = defineModel<string>({ required: true });

const regexp = new RegExp(pattern ?? "", "ig");

const errorValue = ref<string>("");

const timeout = ref<NodeJS.Timeout | null>(null);
function handleInput(e: Event) {
  const target = e.target as HTMLInputElement;

  if (!regexp.test(target.value.trim()) || target.value === "") {
    timeout.value = setTimeout(() => {
      errorValue.value = error ?? "Ошибка введенных данных";
    }, 300);
  } else {
    if (timeout.value) clearTimeout(timeout.value);

    errorValue.value = "";
  }
}
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

  strong {
    color: red;
    font-weight: bold;
  }
}

.error {
  border: 1px solid red;
  &:focus {
    outline: none;
  }
}
</style>
