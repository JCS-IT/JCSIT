<script setup lang="ts">
const modelValue = defineModel<string>({
  default: "",
});
</script>

<template>
  <input class="input input-bordered" type="date" v-model="modelValue" />
</template>
