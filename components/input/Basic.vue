<script setup lang="ts">
const modelValue = defineModel();
</script>

<template>
  <input
    class="input input-bordered invalid:border-error"
    v-model="modelValue"
    v-bind="$attrs"
  />
</template>
