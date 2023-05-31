<template>
  <form class="form" @submit.prevent="handleSubmit">
    <MainExchangerFormCurrencyInput
      :currency="store.leftCurrency"
      label="Отдаете"
      v-model="fromValue"
      :id="FROM_INPUT_ID"
    />
    <MainExchangerFormCurrencyInput
      :currency="store.rightCurrency"
      label="Получаете"
      v-model="toValue"
      :id="TO_INPUT_ID"
    />

    <h3 class="form__midtitle text-big">Ваши реквизиты</h3>

    <MainExchangerFormInputs
      direction="send"
      :inputs="store.leftCurrency?.inputs ?? []"
    />
    <MainExchangerFormInputs
      direction="receive"
      :inputs="store.rightCurrency?.inputs ?? []"
    />
    <SharedUiInputCheckbox v-model="store.acceptRules">
      <p class="text-smaller form__checkbox-text" @click.prevent>
        Я согласен с <a> обработкой персональных данных </a> и принимаю
        <a> правила обмена </a>
      </p>
    </SharedUiInputCheckbox>

    <SharedUiButton
      class="form__submit"
      type="submit"
      :disabled="!store.isFormValid"
    >
      <NuxtIcon name="loading" />

      <span> Перейти к оплате </span>
    </SharedUiButton>
  </form>
</template>

<script setup lang="ts">
import { FROM_INPUT_ID, TO_INPUT_ID } from "~/features/constants/inputIDs";

import { useExchangerStore } from "~/stores/useExchangerStore";

const store = useExchangerStore();

const fromValue = computed({
  get() {
    return store.leftCurrency?.value.toPrecision() ?? "";
  },
  set(newValue: string) {
    store.setLeftValue(newValue);
  },
});

const toValue = computed({
  get() {
    return store.rightCurrency?.value.toPrecision() ?? "";
  },
  set(newValue: string) {
    store.setRightValue(newValue);
  },
});

function handleSubmit(e: Event) {
  alert(
    JSON.stringify([
      store.formValues,
      store.leftCurrency?.value,
      store.rightCurrency?.value,
    ])
  );
}
</script>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  padding: var(--padding-medium);

  &__midtitle {
    padding-top: 0.5rem;
    padding-bottom: 1rem;
    color: white;
    font-weight: 700;
  }

  &__checkbox {
    &-text {
      color: var(--light-gray);
      user-select: none;
      a {
        color: var(--blue);
        &:hover,
        &:active {
          text-decoration: underline 1px solid var(--blue);
        }
      }
    }
  }

  &__submit {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 0 auto;
  }
}
</style>
