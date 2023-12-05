<script setup lang="ts">
const router = useRouter();

definePageMeta({
  redirect: "/laptops",
});
</script>

<template>
  <div class="flex flex-col gap-2 items-center">
    <h1>Redirecting...</h1>
    <span class="loading loading-lg" />
  </div>
</template>
