<template>
  <div class="bonus-badge">
    <nuxt-img
      class="bonus-badge__icon"
      src="images/bonus.png"
      width="32"
      height="32"
      loading="lazy"
    />
    <span class="bonus-badge__text"> Бонусные баллы будут н ачислены! </span>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.bonus-badge {
  display: flex;
  align-items: center;

  &__icon {
    width: 32px;
    height: 32px;
    object-fit: cover;
  }

  &__text {
    @include txt-r;
    color: var(--c-grey-100);
    margin-left: 12px;
  }
}
</style>
