<template>
  <label
    :class="[
      'ui-radio',
      { 'is-active': modelValue === value },
      { 'is-disabled': disabled },
    ]"
    @click="handleClick"
  >
    <span class="ui-radio__circle">
      <span v-if="modelValue === value" class="ui-radio__check" />
    </span>
    <span v-if="$slots.default" class="ui-radio__text">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
interface Props {
  disabled?: boolean;
  value: unknown;
  modelValue: unknown;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  value: null,
  modelValue: null,
});

const emit = defineEmits(["update:modelValue"]);

const handleClick = () => {
  if (!props.disabled) {
    emit("update:modelValue", props.value);
  }
};
</script>

<style lang="scss" scoped>
@use "sass:color" as color;

.ui-radio {
  $this: &;

  display: inline-flex;
  align-items: center;
  width: fit-content;

  cursor: pointer;

  @include h6;

  &__circle {
    border-radius: 50%;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    padding: 3px;

    width: var(--radio-size, 16px);
    height: var(--radio-size, 16px);
    flex-shrink: 0;

    background: transparent;
    box-shadow: 0 0 0 1px var(--c-grey-700) inset;

    transition: background 0.3s, box-shadow 0.1s;
    will-change: box-shadow;
  }

  &__check {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  &:not(.is-active, .is-disabled):hover {
    #{$this}__circle {
      box-shadow: 0 0 0 1px color.adjust($c-grey-700, $lightness: -10%) inset;
    }
  }

  &.is-active {
    #{$this}__circle {
      box-shadow: 0 0 0 2px var(--c-green-100) inset;
    }

    #{$this}__check {
      background: var(--c-green-100);
    }
  }

  &.is-disabled {
    cursor: not-allowed;

    #{$this}__circle {
      box-shadow: 0 0 0 1px var(--c-grey-700) inset;
    }

    #{$this}__check {
      background: var(--c-grey-700);
    }

    #{$this}__text {
      color: var(--c-grey-700);
    }
  }

  &__text {
    margin-left: 12px;
  }
}
</style>
