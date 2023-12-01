<script setup lang="ts">
const router = useRouter();
</script>

<template>
  <div class="flex max-w-2xl">
    <Button @click="router.push('/laptops')"> Laptops </Button>
  </div>
</template>
