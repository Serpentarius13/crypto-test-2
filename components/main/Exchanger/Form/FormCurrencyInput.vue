<template>
  <label class="input">
    <span class="text-small input__title">
      {{ label }}
    </span>
    <div
      class="input__inner"
      :style="
        error
          ? {
              border: '1px solid red',
            }
          : {}
      "
    >
      <SharedUiCurrencyLogo
        class="input__inner-logo"
        :logo="currency.logo"
        :name="currency.name"
        v-if="currency"
      />

      <input
        type="number"
        class="text-medium"
        :min="currency?.min ?? 0"
        :max="currency?.max ?? 0"
        step="any"
        @input="handleInput"
        @invalid="handleSetInvalidInput"
        v-model="model"
      />
    </div>

    <div class="input__footer text-smaller">
      <template v-if="store.isLoading">
        <SharedUiLoading size="24" />
      </template>
      <template
        v-else-if="currency?.min === undefined || currency?.max === undefined"
      >
        <span> Выберите валюту для обмена </span>
      </template>
      <template v-else>
        <span> Мин.: {{ currency?.min }} </span>

        <span> Макс.: {{ currency?.max }} </span>
      </template>
    </div>

    <span v-if="error" class="input__error text-small">
      {{ error }}
    </span>
  </label>
</template>

<script setup lang="ts">
import { TBoundCurrency } from "~/features/types/currency.types";
import { checkIsUndefined } from "~/features/utils/checkIsUndefined";
import { useExchangerStore } from "~/stores/useExchangerStore";

interface IFormCurrencyInput {
  currency: TBoundCurrency | null;
  label: string;
}

const { currency, label } = defineProps<IFormCurrencyInput>();

const store = useExchangerStore();

const model = defineModel<string>({ required: true });

const error = ref<string>("");

function handleSetInvalidInput(e: Event) {
  e.preventDefault();
  const target = e.target as HTMLInputElement;

  if (target.min > target.value) {
    error.value = `Значение не должно быть ниже ${target.min}`;
  } else if (target.max < target.value) {
    error.value = `Значение не должно быть выше ${target.max}`;
  }
}

function handleInput(e: Event) {
  if (
    checkIsUndefined(currency?.max) ||
    checkIsUndefined(currency?.min) ||
    !currency
  )
    return;

  error.value = "";

  const target = e.target as HTMLInputElement;

  const v = parseFloat(target.value);

  if (v > currency.max) {
    const nextVal = currency.max.toString();
    target.value = nextVal;
    model.value = nextVal;
    return;
  }

  if (v < currency.min) {
    const nextVal = currency.min.toString();
    target.value = nextVal;
    model.value = nextVal;
    return;
  }
}
</script>

<style scoped lang="scss">
.input {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  .input__title {
    color: white;
    font-weight: 700;
  }

  &__inner {
    display: flex;
    gap: 2rem;
    align-items: center;
    justify-content: space-between;

    padding: 2rem;
    background-color: var(--blue-dark);
    border-radius: var(--radius-small);

    &:focus-within {
      outline: 1px solid white;
    }

    &-logo {
      flex: 1;
      width: 100%;
    }

    input {
      text-align: right;
      color: white;
      max-width: 55%;
      width: 100%;
      outline: none;
    }
  }

  &__footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      color: var(--gray);
      font-weight: 400;
    }
  }

  &__error {
    color: red;
    font-weight: 700;
  }
}
</style>
