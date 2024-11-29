<template>
  <div class="default-layout">
    <app-header />
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from "~/components/organisms/app-header.vue";
</script>

<style lang="scss" scoped></style>
