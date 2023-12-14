<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <div class="grid gap-2">
    <button class="btn" @click="navigateTo({ name: 'admin-rooms' })">
      Rooms
    </button>
    <button class="btn" @click="navigateTo({ name: 'admin-carts' })">
      Carts
    </button>
  </div>
</template>
