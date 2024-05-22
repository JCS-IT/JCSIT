<script setup lang="ts">
const modelValue = defineModel();
</script>

<template>
  <label class="label">
    <input
      class="input input-bordered invalid:border-error"
      v-model="modelValue"
      v-bind="$attrs"
    />
    <span class="text-xs">hello</span>
  </label>
</template>
