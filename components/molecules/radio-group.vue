<template>
  <div class="radio-group">
    <div class="radio-group__options">
      <ui-radio
        v-for="option in options"
        :key="option.value"
        :model-value="modelValue"
        :value="option.value"
        :disabled="disabled"
        @update:model-value="$emit('update:model-value', $event)"
      >
        {{ option.title }}
      </ui-radio>
    </div>

    <div v-show="hasError" class="radio-group__error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

import UiRadio from "~/components/atoms/ui-radio.vue";
import { useValidation } from "~/composables/use-validation";

export interface RadioOption {
  title: string;
  value: any;
}

interface Props {
  id?: string;
  rules?: unknown;
  options: RadioOption[];
  modelValue: any;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

defineEmits(["update:modelValue"]);

const { rules: usedRules, modelValue: usedValue } = toRefs(props);

const { value, errorMessage, validate, hasError, meta } = useValidation({
  modelValue: usedValue,
  rules: usedRules,
  name: props.id,
});

watch(
  usedValue,
  () => {
    validate();
  },
  {
    flush: "post",
  }
);
</script>

<style lang="scss" scoped>
.radio-group {
  display: flex;
  flex-direction: column;

  &__options {
    display: flex;
    align-items: center;

    & > *:not(:last-child) {
      margin-right: 24px;
    }
  }

  &__error {
    margin-top: 8px;
    color: var(--c-red);

    @include txt-s;
  }
}
</style>
