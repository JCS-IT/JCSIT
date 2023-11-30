<script setup lang="ts">
const router = useRouter();
const route = useRoute("laptops-booking");

definePageMeta({
  title: "Booking",
  description: "Book a laptop cart",
});
</script>

<template>
  <div>
    <h1>Cart: {{ route.query.cart }}</h1>
  </div>
</template>
