<script setup lang="ts">
const router = useRouter();
const route = useRoute("laptops-booking");

definePageMeta({
  title: "Booking",
  description: "Book a laptop cart",
});

const carts = ref([
  { id: 1, name: "Red Cart", type: "windows", location: "LC3" },
  { id: 2, name: "Blue Cart", type: "mac", location: "LC3" },
  { id: 3, name: "Green Cart", type: "chromebook", location: "LC3" },
]);
</script>

<template>
  <div>
    <h1>Cart: {{ route.query.cart }}</h1>
  </div>
</template>
