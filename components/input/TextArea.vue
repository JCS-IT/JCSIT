<script setup lang="ts">
defineProps<{
  placeholder?: string;
  disabled?: boolean;
  full?: boolean;
  edit: boolean;
}>();

const modelValue = defineModel<string>({ default: "" });
</script>

<template>
  <textarea
    v-if="edit"
    class="textarea textarea-bordered"
    :class="{ 'w-full': full }"
    :placeholder="placeholder"
    v-model.lazy="modelValue"
    :disabled="disabled"
    v-bind="$attrs"
  />
  <span v-if="!edit && modelValue.length > 0" class="w-full">
    {{ modelValue }}
  </span>
</template>
