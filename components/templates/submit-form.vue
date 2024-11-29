<template>
  <form ref="form" @submit="submit">
    <slot v-bind="{ invalid }" />
  </form>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import { useForm } from "vee-validate";

const emit = defineEmits(["handle-submit"]);

const form = ref<HTMLFormElement | null>(null);

const { handleSubmit, meta, values } = useForm();

const invalid = computed(() => !meta.value.valid);

const submit = handleSubmit(() => {
  emit("handle-submit", values);
});

const handleKeycode = ({ keyCode }: { keyCode: number }) => {
  if (keyCode === 13) {
    form.value?.requestSubmit();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeycode);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeycode);
});
</script>
