<template>
  <div class="radio-group">
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
</template>

<script setup lang="ts">
import UiRadio from "~/components/atoms/ui-radio.vue";

export interface RadioOption {
  title: string;
  value: string;
}

interface Props {
  options: RadioOption[];
  modelValue: unknown;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  disabled: false,
  options: null,
  modelValue: null,
});

defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped>
.radio-group {
}
</style>
