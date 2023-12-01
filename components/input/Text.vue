<script setup lang="ts">
const modelValue = defineModel<string>({ default: "" });
</script>

<template>
  <input type="text" class="input input-bordered" v-model="modelValue" />
</template>
