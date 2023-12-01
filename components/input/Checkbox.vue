<script setup lang="ts">
defineProps<{
  edit?: boolean;
  label?: string;
}>();

const modelValue = defineModel<Boolean>();
</script>

<template>
  <label class="label cursor-pointer max-w-fit">
    <input
      type="checkbox"
      v-model="modelValue"
      class="checkbox checkbox-sm"
      v-bind="$attrs"
    />
    <span class="ml-4 label-text">{{ label }}</span>
  </label>
</template>
