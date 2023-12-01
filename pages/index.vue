<script setup lang="ts">
const router = useRouter();

const redirect = (path: string) => {
  window.location.href = path;
};
</script>

<template>
  <div class="flex flex-col max-w-2xl gap-2">
    <Button @click="navigateTo('/laptops')"> Laptops </Button>
    <Button @click="redirect('https://jcs-tab-tracker.web.app')" class="btn">
      Tab Tracker
    </Button>
  </div>
</template>
