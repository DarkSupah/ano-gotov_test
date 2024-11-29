<template>
  <header class="app-header">
    <app-logo />

    <nav class="app-header__controls">
      <ui-button href="tel:+74994447675" variant="link">
        <template #icon>
          <icon name="icon-phone" />
        </template>

        <template #default> +7 499 444-76-75</template>
      </ui-button>

      <ui-button class="mobile-up" href="https://google.com" variant="link">
        Вернуться на портал
      </ui-button>

      <ui-button variant="link" @click="handleExit">
        <template #icon>
          <icon name="icon-exit" />
        </template>
        <template #default> Выйти</template>
      </ui-button>
    </nav>
  </header>
</template>

<script setup lang="ts">
import AppLogo from "~/components/atoms/app-logo.vue";
import UiButton from "~/components/atoms/ui-button.vue";

const handleExit = () => {
  console.log("exit not implemented");
};
</script>

<style lang="scss" scoped>
@use "sass:color";

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 20px 24px;

  position: sticky;
  top: 0;

  background: var(--c-background);

  z-index: var(--header-z-index);

  @include tablet-up {
    padding: 20px 80px;
  }

  &__controls {
    --button-icon-size: 24px;
    --button-padding: 0;
    --button-content-display: none;

    @include breadcrumb("button", true);

    display: flex;
    align-items: center;

    @include mobile-up {
      --button-content-display: initial;
    }

    & > *:not(:last-child) {
      margin-right: 24px;
    }
  }
}
</style>
