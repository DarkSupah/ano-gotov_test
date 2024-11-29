<template>
  <div :class="['ui-badge', 'ui-badge--' + type]">
    <span class="ui-badge__content">
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
type BadgeType = "success" | "normal";

interface Props {
  type: BadgeType;
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.ui-badge {
  display: flex;
  align-items: center;

  border-radius: 50px;
  padding: 4px 8px;

  @include tablet-only {
    padding: 8px 10px;
  }

  @include tablet-up {
    padding: 10px 16px;
  }

  &__content {
    @include txt-s-m;
    color: var(--c-grey-100);
  }

  &--success {
    background: var(--c-green-500);
  }
}
</style>
