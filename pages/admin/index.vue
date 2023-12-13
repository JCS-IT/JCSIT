<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <div>
    <button class="btn" @click="navigateTo({ name: 'admin-rooms' })">
      Rooms
    </button>
  </div>
</template>
