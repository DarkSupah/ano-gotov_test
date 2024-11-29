<template>
  <component
    :is="tag"
    v-bind="attributes"
    :class="['ui-button', `ui-button_${variant}--${color}`]"
    @click="handleClick"
  >
    <span v-if="slots.icon" class="ui-button__icon">
      <slot name="icon" />
    </span>

    <span v-if="!iconOnly && !loading" class="ui-button__content">
      <slot />
    </span>
  </component>
</template>

<script setup lang="ts">
import { useSlots, computed } from "vue";

type ButtonVariant = "filled" | "outline" | "link";
type ButtonType = "button" | "submit" | "reset";
type ButtonColor = "primary" | "secondary";

interface ButtonAttributes {
  type?: ButtonType;
  disabled?: boolean;
  href?: string;
  target?: string;
}

interface Props {
  iconOnly?: boolean;

  loading?: boolean;
  disabled?: boolean;

  type?: ButtonType;
  variant?: ButtonVariant;
  color?: ButtonColor;

  href?: string;
  target?: string;
}

const props = withDefaults(defineProps<Props>(), {
  iconOnly: false,

  loading: false,
  disabled: false,

  variant: "filled",
  color: "primary",
  type: "button",
});

const slots = useSlots();
const emit = defineEmits(["click"]);

// eslint-disable-next-line no-undef
const NuxtLink = resolveComponent("NuxtLink");

const tag = computed(() => (props.href ? NuxtLink : "button"));
const attributes = computed<ButtonAttributes>(() => {
  if (tag.value === "button") {
    return {
      type: props.type,
      disabled: props.disabled,
    };
  }

  return {
    href: props.href,
    target: props.target,
  };
});

const iconOnly = computed(() => slots.icon && !slots.default);

const handleClick = (event): void => {
  if (props.disabled || props.loading) {
    event.stopPropagation();
    event.preventDefault();
  } else {
    emit("click", event);
  }
};
</script>

<style lang="scss" scoped>
.ui-button {
  $this: &;

  display: flex;
  align-items: center;
  justify-content: center;

  width: var(--button-width, fit-content);
  height: var(--button-height, 44px);
  padding: var(--button-padding, 13.5px);

  border-radius: var(--button-border-radius, 50px);

  column-gap: var(--button-icon-spacing, 10px);

  box-sizing: border-box;

  font-size: var(--button-font-size, 14px);
  line-height: var(--button-line-height, 16.8px);
  font-weight: var(--button-font-weight, 500);

  &__icon {
    --icon-size: var(--button-icon-size);
  }

  &__content {
    display: var(--button-content-display);
  }

  &_filled {
    &--primary {
      background: var(--c-grey-100);
      color: var(--c-white);
    }

    &--secondary {
    }
  }

  &_outline {
    &--primary {
      border: 2px solid var(--c-grey-100);
      color: var(--c-grey-100);
    }

    &--secondary {
    }
  }

  &_link {
    &--primary {
    }

    &--secondary {
    }
  }
}
</style>
